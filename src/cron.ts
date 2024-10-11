import schedule from "node-schedule";
import { formatDistance } from "date-fns";
import cronstrue from "cronstrue";

/**
 * @typedef JobDescriptor
 * @type {Object}
 * @property {String} name
 * @property {String} cron
 * @property {Function} test
 * @property {LogMethods} [log]
 * @property {Boolean} [startup]
 */

/**
 * @typedef JobDefaults
 * @type {Object}
 * @property {LogMethods} [log]
 * @property {Boolean} [startup]
 */

/**
 * @typedef LogMethods
 * @type {Object}
 * @property {Function} [verbose]
 * @property {Function} [success]
 * @property {Function} [error]
 */

const sampleJobs = [
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
    logSuccess: null,
  },
];

function createJob({ name, test, log }) {
  let count = 0;
  let lastTime;

  return async function runJob() {
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

function readableFromCron(cron) {
  try {
    return cronstrue.toString(cron);
  } catch (e) {
    return;
  }
}

/**
 * @param {JobDescriptor[]} jobs
 * @param {JobDefaults} defaults
 */
export async function cron(
  jobs = sampleJobs,
  {
    log = { verbose: console.log, success: console.log, error: console.log },
    startup = false,
  } = {}
) {
  const defaults = {
    log,
    startup,
  };

  const jobRunners = jobs
    .map((job) => ({
      ...defaults,
      ...job,
    }))
    .map((job) => ({ ...job, runner: createJob(job) }));

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
