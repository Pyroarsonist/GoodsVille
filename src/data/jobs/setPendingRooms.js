import debugHandler from 'debug';

import { Room } from 'data/models';
import { Op } from 'sequelize';

const debug = debugHandler('goodsville:jobs:set-pending-rooms');

export default async () => {
  const length = await Room.update(
    { status: 'pending' },
    {
      where: {
        status: 'open',
        startedAt: {
          [Op.lte]: new Date(),
        },
      },
    },
  );
  debug('Set to pending %d rooms', length);
};
