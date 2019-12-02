import { intervals as config } from 'config';

import closeLots from './closeLots';

export default [
  {
    name: 'closeLots',
    func: closeLots,
    interval: config.closeLots,
  },
];
