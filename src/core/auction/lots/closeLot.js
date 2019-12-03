import debugHandler from 'debug';
import sequelize from 'data/sequelize';
import { Room, Lot, Bet, User } from 'data/models';
import moment from 'moment';
import Decimal from 'decimal.js';

const debug = debugHandler('goodsville:auction:lot:close');

const postponeLot = async (lot, transaction) => {
  // todo: add config for hours
  await lot.room.update(
    { status: 'open', startedAt: moment(lot.room.startedAt).add(1, 'hours') },
    { transaction },
  );
};

const closeLot = async (id, transaction) => {
  const lot = await Lot.findByPk(id, {
    include: [
      {
        model: Room,
        as: 'room',
      },
      {
        model: User,
        as: 'owner',
      },
    ],
    transaction,
  });
  if (!lot) throw new Error('Lot not exists');

  if (lot.purchaserId) {
    lot.room.status = 'closed';
    await lot.room.save();
    throw new Error('Lot is already purchased');
  }

  const [highestBet] = await lot.getBets(
    {
      where: { status: 'highest' },
    },
    { transaction },
  );

  if (!highestBet) {
    debug('No highest bets for lot #%s, postponing', id);
    await postponeLot(lot, transaction);
    return;
  }

  await lot.room.update(
    { status: 'closed', endedAt: new Date() },
    { transaction },
  );

  await Bet.update(
    {
      status: 'failed',
    },
    { where: { status: 'overbid' }, transaction },
  );

  await lot.owner.update(
    {
      balance: new Decimal(lot.owner.balance).add(
        new Decimal(highestBet.price),
      ),
    },
    { transaction },
  );

  await lot.update(
    {
      purchaserId: highestBet.userId,
    },
    { transaction },
  );

  await highestBet.update({ status: 'successful' }, { transaction });

  debug(
    'Lot #%s closed successful, purchaser #%s give owner #%s %s money',
    id,
    highestBet.userId,
    lot.owner.id,
    highestBet.price,
  );
};

export default async id => {
  debug('Closing lot #%s', id);
  const transaction = await sequelize.transaction();
  try {
    await closeLot(id, transaction);
    await transaction.commit();
  } catch (e) {
    debug('Failed close lot\n%O', e);
    await transaction.rollback();
    throw e;
  }
};
