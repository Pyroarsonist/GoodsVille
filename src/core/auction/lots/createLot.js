import debugHandler from 'debug';
import sequelize from 'data/sequelize';
import { Room, Lot } from 'data/models';
import moment from 'moment';

const debug = debugHandler('goodsville:auction:lot:create');

async function createLot(
  { description, shortDescription, name, price, tag, ownerId, startedAt },
  transaction,
) {
  const lot = await Lot.create(
    {
      description,
      shortDescription,
      name,
      startPrice: price,
      currentPrice: price,
      tag,
      ownerId,
    },
    { transaction },
  );
  lot.room = await Room.create(
    {
      startedAt,
      supposedEndsAt: moment(startedAt).add(15, 'm'),
      lotId: lot.id,
    },
    { transaction },
  );
  debug('Created lot #%s, owner: %s', lot.id, ownerId);
  return lot;
}
export default async args => {
  const transaction = await sequelize.transaction();
  try {
    const lot = await createLot(args, transaction);
    await transaction.commit();
    return lot;
  } catch (e) {
    debug('Failed create lot\n%O', e);
    await transaction.rollback();
    throw e;
  }
};
