const schedule = require("node-schedule");
const { formatDistance } = require("date-fns");
const cronstrue = require("cronstrue");

/**
 * @typedef JobDescriptor
 * @type {Object}
 * @property {String} name
 * @property {String} cron
 * @property {Function} test
 * @property {Function} [logVerbose]
 * @property {Function} [logSuccess]
 * @property {Function} [logError]
 * @property {Boolean} [startup]
 */

/**
 * @typedef JobDefaults
 * @type {Object}
 * @property {Function} [logVerbose]
 * @property {Function} [logSuccess]
 * @property {Function} [logError]
 * @property {Boolean} [startup]
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

function createJob({ name, test, logVerbose, logError, logSuccess }) {
  let count = 0;
  let lastTime;

  return async function runJob() {
    const currentTime = Date.now();
    const distance = lastTime
      ? formatDistance(lastTime, currentTime, { addSuffix: true })
      : null;
    logVerbose?.(
      `Cron ${name} (${count} runs, last run ${distance ?? "never"})...`
    );

    lastTime = currentTime;
    count++;

    try {
      logVerbose?.(`Run ${name}...`);
      await test();
      logSuccess?.(`Success ${name}.`);
    } catch (e) {
      logError?.(`Error ${name}: ` + e.message);
      logVerbose?.(e);
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
module.exports = async function cron(
  jobs = sampleJobs,
  {
    logVerbose = console.log,
    logSuccess = console.log,
    logError = console.log,
    startup = false,
  } = {}
) {
  const defaults = {
    logVerbose,
    logSuccess,
    logError,
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
      logVerbose?.(`Cron ${job.name} (will run ${readable})`);
      schedule.scheduleJob(job.cron, job.runner);
    } else logError?.(`Cron ${job.name} (will not run)`);
  });

  for (let job of jobRunners) {
    if (job.startup) await job.runner();
  }
};
