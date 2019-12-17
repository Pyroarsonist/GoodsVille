import { User, Room, Notification, NotificationToUser } from 'data/models';
import createLot from 'core/auction/lots/createLot';
import randomize from 'crypto-random-string';
import randomFloat from 'random-float';

describe('createLot', () => {
  let user = null;

  beforeAll(async () => {
    user = await User.createInstance(
      randomize({ length: 32 }),
      randomize({ length: 32 }),
      randomize({ length: 32 }),
      randomize({ length: 32 }),
    );
  });
  afterAll(async () => {
    await user.destroy();
  });

  let payload = null;
  let lot = null;

  beforeEach(async () => {
    payload = {
      description: randomize({ length: 32 }),
      shortDescription: randomize({ length: 32 }),
      name: randomize({ length: 32 }),
      price: randomFloat(100),
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
      await room.lot.destroy();
    }
  });

  it('should have data from payload', async () => {
    lot = await createLot(payload);

    const room = await Room.getAllData(lot?.room?.id);
    expect(room).toBeTruthy();
    expect(room.status).toBe('open');

    expect(room.lot).toBeTruthy();
    Object.keys(payload).forEach(key => {
      if (['price', 'startedAt'].includes(key)) return;
      expect(room.lot[key]).toEqual(payload[key]);
    });
  });
});
