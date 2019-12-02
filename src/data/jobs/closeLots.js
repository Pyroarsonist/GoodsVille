import debugHandler from 'debug';

import { Room, Lot } from 'data/models';
import Promise from 'bluebird';
import closeLot from 'core/auction/lots/closeLot';
import { Op } from 'sequelize';

const debug = debugHandler('goodsville:jobs:close-lots');

export default async () => {
  const rooms = await Room.findAll({
    attributes: ['id'],
    where: {
      status: 'pending',
      supposedEndsAt: {
        [Op.lte]: new Date(),
      },
    },
    include: [
      {
        model: Lot,
        as: 'lot',
        attributes: ['id'],
      },
    ],
  });
  debug('Found %d rooms to close', rooms.length);
  await Promise.each(rooms, room => closeLot(room.lot.id));
};
