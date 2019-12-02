import debugHandler from 'debug';
import jobs from 'data/jobs';
import _ from 'lodash';

const debug = debugHandler('goodsville:scheduler');

const intervals = {};

export const cleanup = () => {
  debug('Cleaning old jobs...');
  _.forEach(intervals, i => clearInterval(i));
};

export default () => {
  const w = new Date().toISOString();

  debug('Starting scheduler');
  _.forEach(jobs, async job => {
    debug('Adding job %s with interval %d', job.name, job.interval);
    const func = async () => {
      debug('Starting job %s', job.name);
      try {
        await job.func(w);
        debug('Job %s finished successfully', job.name);
      } catch (e) {
        debug('Job %s failed\n', job.name, e);
      }
    };
    if (job.runAtTheStart) await func();
    intervals[job.name] = setInterval(func, +job.interval);
  });

  debug('Scheduler successfully started');
};
