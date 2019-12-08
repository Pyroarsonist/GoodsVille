import { intervals as config } from 'config';

import closeLots from './closeLots';
import setPendingRooms from './setPendingRooms';
import notifyUsersAboutLots from './notifyUsersAboutLots';

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
  {
    name: 'notifyUsersAboutLots',
    func: notifyUsersAboutLots,
    interval: config.notifyUsersAboutLots,
  },
];
