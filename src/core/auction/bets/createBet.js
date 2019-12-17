import debugHandler from 'debug';
import sequelize from 'data/sequelize';
import { Bet, Lot, Room, User } from 'data/models';
import { Op } from 'sequelize';
import { Decimal } from 'decimal.js';
import Bluebird from 'bluebird';
import moment from 'moment';
import pubsub from 'core/subscriptions/graphqlPubSub';

const debug = debugHandler('goodsville:auction:bet:create');

const createBet = async ({ price: _price, lotId, userId }, transaction) => {
  const price = Number.parseFloat(_price.toFixed(2));
  if (price !== _price) throw new Error('Invalid price precision');

  const user = await User.findByPk(userId, { transaction });
  if (!user) throw new Error('User is not found');
  if (user.balance < price) {
    throw new Error('Not sufficient funds');
  }

  const lot = await Lot.findByPk(lotId, {
    include: [
      {
        model: Room,
        as: 'room',
      },
    ],
    transaction,
  });
  if (!lot) throw new Error('Lot not found');

  if (lot.room.status !== 'pending') {
    if (lot.room.status === 'closed') throw new Error('Auction ended');
    if (lot.room.status === 'open')
      throw new Error('Auction is not started yet');
    throw new Error('Invalid auction status');
  }

  const [highestBet] = await lot.getBets(
    { where: { status: 'highest' } },
    { transaction },
  );

  if (highestBet) {
    if (highestBet.userId === userId)
      throw new Error('You have highest bet already');
    if (highestBet.price >= price)
      throw new Error('Highest bet has more price');
  } else {
    if (price <= 0) throw new Error('Price is less or equal than 0');
    if (lot.startPrice >= price) throw new Error('Start price is bigger');
  }

  debug(
    'Creating new bet with price %s, lot #%s and user #%s',
    price,
    lotId,
    userId,
  );

  const bet = await Bet.create(
    { userId, price, lotId, status: 'highest' },
    { transaction },
  );

  let userBalance = new Decimal(user.balance).sub(new Decimal(price));

  await user.update({ balance: userBalance }, { transaction });

  const overbidBets = await Bet.findAll(
    {
      where: {
        lotId,
        status: 'highest',
        id: {
          [Op.ne]: bet.id,
        },
      },
    },
    { transaction },
  );

  await Bluebird.each(overbidBets, async overbidBet => {
    const bettor = await User.findByPk(overbidBet.userId, { transaction });
    let newBalance;
    if (userId === overbidBet.userId) {
      newBalance = userBalance.add(new Decimal(overbidBet.price));
      userBalance = newBalance;
    } else {
      newBalance = new Decimal(bettor.balance).add(
        new Decimal(overbidBet.price),
      );
    }

    await bettor.update(
      {
        balance: newBalance,
      },
      { transaction },
    );
  });

  await Bet.update(
    { status: 'overbid' },
    {
      where: {
        id: overbidBets.map(b => b.id),
      },
      transaction,
    },
  );

  await lot.update({ currentPrice: price }, { transaction });

  await lot.room.update(
    { supposedEndsAt: moment(bet.createdAt).add(3, 'm') },
    { transaction },
  );

  pubsub.publish('room', lot.room.id);

  // todo: add notification for last highest bet user
};

export default async args => {
  const transaction = await sequelize.transaction();
  try {
    await createBet(args, transaction);
    await transaction.commit();
  } catch (e) {
    debug('Failed create bet\n%O', e);
    await transaction.rollback();
    throw e;
  }
};
