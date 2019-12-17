import { User, Room, Bet, Notification, NotificationToUser } from 'data/models';
import createLot from 'core/auction/lots/createLot';
import closeLot from 'core/auction/lots/closeLot';
import createBet from 'core/auction/bets/createBet';
import randomize from 'crypto-random-string';
import randomFloat from 'random-float';

describe('closeLot', () => {
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

  it('should have closed', async () => {
    lot = await createLot(payload);
    await Room.update({ status: 'pending' }, { where: { lotId: lot.id } });

    await createBet({
      price: +(+lot.currentPrice + +randomFloat(10).toFixed(2)).toFixed(2),
      lotId: lot.id,
      userId: bettor.id,
    });

    await closeLot(lot.id);

    const room = await Room.getAllData(lot?.room?.id);
    expect(room?.lot).toBeTruthy();

    expect(room.status).toBe('closed');

    expect(room.lot?.owner?.id).toBe(user.id);
    expect(room.lot?.purchaser?.id).toBe(bettor.id);
  });

  it('should have postponed', async () => {
    lot = await createLot(payload);
    await Room.update({ status: 'pending' }, { where: { lotId: lot.id } });

    await closeLot(lot.id);

    const room = await Room.getAllData(lot?.room?.id);
    expect(room?.lot).toBeTruthy();

    expect(room.status).toBe('open');

    expect(room.lot?.owner?.id).toBe(user.id);
    expect(room.lot?.purchaser).toBeNull();
  });
});
