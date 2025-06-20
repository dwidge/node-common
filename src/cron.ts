import cronstrue from "cronstrue";
import { formatDistance } from "date-fns";
import schedule from "node-schedule";

interface LogMethods {
  verbose?: (...args: any[]) => void;
  success?: (...args: any[]) => void;
  error?: (...args: any[]) => void;
}

interface JobDescriptor {
  name: string;
  cron: string;
  test: () => any | Promise<any>;
  log?: LogMethods;
  startup?: boolean;
}

interface JobDefaults {
  log?: LogMethods;
  startup?: boolean;
}

const sampleJobs: JobDescriptor[] = [
  {
    name: "JobA",
    cron: "*/1 * * * *",
    startup: true,
    test: () => console.log("Running JobA..."),
  },
  {
    name: "JobB",
    cron: "0 */1 * * *",
    test: () => console.log("Running JobB..."),
  },
];

function createJob({
  name,
  test,
  log,
}: {
  name: string;
  test: () => unknown | Promise<unknown>;
  log: LogMethods;
}): () => Promise<void> {
  let count = 0;
  let lastTime: number | undefined;

  return async function runJob(): Promise<void> {
    const currentTime = Date.now();
    const distance = lastTime
      ? formatDistance(lastTime, currentTime, { addSuffix: true })
      : null;
    log.verbose?.(name, `${count} runs, last run ${distance ?? "never"}`);

    lastTime = currentTime;
    count++;

    try {
      log.verbose?.(name, "running...");
      await test();
      log.success?.(name, "success");
    } catch (e) {
      log.error?.(name, e);
    }
  };
}

function readableFromCron(cron: string): string | undefined {
  try {
    return cronstrue.toString(cron);
  } catch (e) {
    return;
  }
}

export async function cron(
  jobs: JobDescriptor[] = sampleJobs,
  {
    log = { verbose: console.log, success: console.log, error: console.log },
    startup = false,
  }: JobDefaults = {},
): Promise<void> {
  const defaults: JobDefaults = {
    log,
    startup,
  };

  const jobRunners = jobs
    .map((job) => ({
      ...defaults,
      ...job,
    }))
    .map((job) => ({
      ...job,
      runner: createJob({ ...job, log: job.log ?? log }),
    }));

  jobRunners.forEach((job) => {
    const readable = readableFromCron(job.cron);
    if (readable) {
      log.verbose?.(job.name, `will run ${readable}`);
      schedule.scheduleJob(job.cron, job.runner);
    } else log.error?.(job.name, `will not run`);
  });

  for (let job of jobRunners) {
    if (job.startup) await job.runner();
  }
}
