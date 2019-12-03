import { intervals as config } from 'config';

import closeLots from './closeLots';
import setPendingRooms from './setPendingRooms';

export default [
  {
    name: 'closeLots',
    func: closeLots,
    interval: config.closeLots,
  },
  {
    name: 'setPendingRooms',
    func: setPendingRooms,
    interval: config.setPendingRooms,
  },
];
