import { User, Room } from 'data/models';
import createLot from 'core/auction/lots/createLot';
import job from 'data/jobs/setPendingRooms';
import randomize from 'crypto-random-string';
import randomFloat from 'random-float';
import moment from 'moment';

describe('setPendingRooms', () => {
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
      await room.destroy();
      await room.lot.destroy();
    }
  });

  it('should set pending', async () => {
    lot = await createLot(payload);
    await job();

    const room = await Room.getAllData(lot?.room?.id);
    expect(room).toBeTruthy();
    expect(room.status).toBe('pending');
  });

  it('should not set pending', async () => {
    payload.startedAt = moment().add(9999, 'm');
    lot = await createLot(payload);
    await job();

    const room = await Room.getAllData(lot?.room?.id);
    expect(room).toBeTruthy();
    expect(room.status).toBe('open');
  });
});
