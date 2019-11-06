import debugHandler from 'debug';
import sequelize from 'data/sequelize';
import { Room, Lot } from 'data/models';

const debug = debugHandler('goodsville:action:lot');

async function createLotInstance({
  description,
  shortDescription,
  name,
  price,
  tag,
  ownerId,
  startedAt,
}) {
  const transaction = await sequelize.transaction();
  try {
    const lot = await Lot.create(
      {
        description,
        shortDescription,
        name,
        price,
        tag,
        ownerId,
      },
      { transaction },
    );
    await Room.create(
      {
        startedAt,
        lotId: lot.id,
      },
      { transaction },
    );
    await transaction.commit();
  } catch (e) {
    debug('Failed create instance\n%O', e);
    await transaction.rollback();
    throw e;
  }
}

export default createLotInstance;
