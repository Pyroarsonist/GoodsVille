import { User, Room, Bet, Notification, NotificationToUser } from 'data/models';
import createLot from 'core/auction/lots/createLot';
import closeLot from 'core/auction/lots/closeLot';
import createBet from 'core/auction/bets/createBet';
import randomize from 'crypto-random-string';
import randomFloat from 'random-float';

describe('createBet', () => {
  let user = null;
  let bettor = null;

  beforeAll(async () => {
    user = await User.createInstance(
      randomize({ length: 32 }),
      randomize({ length: 32 }),
      randomize({ length: 32 }),
      randomize({ length: 32 }),
    );

    bettor = await User.createInstance(
      randomize({ length: 32 }),
      randomize({ length: 32 }),
      randomize({ length: 32 }),
      randomize({ length: 32 }),
    );
    bettor.balance = 9999;
    await bettor.save();
  });
  afterAll(async () => {
    await user.destroy();
    await bettor.destroy();
  });

  let payload = null;
  let lot = null;

  beforeEach(async () => {
    payload = {
      description: randomize({ length: 32 }),
      shortDescription: randomize({ length: 32 }),
      name: randomize({ length: 32 }),
      price: +randomFloat(100).toFixed(2),
      tag: randomize({ length: 32 }),
      ownerId: user.id,
      startedAt: new Date(),
    };
  });

  afterEach(async () => {
    const room = await Room.getAllData(lot?.room?.id);

    if (room) {
      const notifications = await Notification.findAll({
        where: { roomId: room.id },
      });

      if (notifications.length) {
        await NotificationToUser.destroy({
          where: { notificationId: notifications.map(x => x.id) },
        });
        await Notification.destroy({
          where: { id: notifications.map(x => x.id) },
        });
      }

      await room.destroy();
      await Bet.destroy({ where: { lotId: room.lot.id } });
      await room.lot.destroy();
    }
  });

  it('should have n bets', async () => {
    lot = await createLot(payload);
    await Room.update({ status: 'pending' }, { where: { lotId: lot.id } });

    let price = +lot.currentPrice;
    const promises = [];
    const n = parseInt(1 + randomFloat(10));
    for (let i = 0; i < n; i++) {
      price += +randomFloat(10).toFixed(2);
      price = +price.toFixed(2);
      promises.push(
        createBet({
          price,
          lotId: lot.id,
          userId: bettor.id,
        }),
      );
    }

    await Promise.all(promises);

    await closeLot(lot.id);

    const room = await Room.getAllData(lot?.room?.id);
    expect(room?.lot).toBeTruthy();

    expect(room.status).toBe('closed');

    expect(room.lot?.owner?.id).toBe(user.id);
    expect(room.lot?.purchaser?.id).toBe(bettor.id);

    expect(room.lot.bets).toHaveLength(n);
  });

  it('should have 1 bet', async () => {
    lot = await createLot(payload);
    await Room.update({ status: 'pending' }, { where: { lotId: lot.id } });

    await createBet({
      price: +lot.currentPrice + +randomFloat(10).toFixed(2),
      lotId: lot.id,
      userId: bettor.id,
    });

    await closeLot(lot.id);

    const room = await Room.getAllData(lot?.room?.id);
    expect(room?.lot).toBeTruthy();

    expect(room.status).toBe('closed');

    expect(room.lot?.owner?.id).toBe(user.id);
    expect(room.lot?.purchaser?.id).toBe(bettor.id);

    expect(room.lot.bets).toHaveLength(1);
  });

  it('should throw if price less than start price', async () => {
    const price = parseInt(5 + randomFloat(10));
    lot = await createLot({ ...payload, price });

    await Room.update({ status: 'pending' }, { where: { lotId: lot.id } });

    expect.assertions(1);

    await expect(
      createBet({
        price: +lot.currentPrice - 1,
        lotId: lot.id,
        userId: bettor.id,
      }),
    ).rejects.toThrow();
  });

  it('should have 0 bets', async () => {
    lot = await createLot(payload);
    await Room.update({ status: 'pending' }, { where: { lotId: lot.id } });

    await closeLot(lot.id);

    const room = await Room.getAllData(lot?.room?.id);
    expect(room?.lot).toBeTruthy();

    expect(room.status).toBe('open');

    expect(room.lot?.owner?.id).toBe(user.id);
    expect(room.lot?.purchaser).toBeNull();

    expect(room.lot.bets).toHaveLength(0);
  });
});
