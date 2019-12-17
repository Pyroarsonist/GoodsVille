import DataType from 'sequelize';
import Model from '../sequelize';
import { Bet, Lot, RoomToUser, User } from './index';

const Room = Model.define('Room', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataType.STRING(32),
    allowNull: false,
    defaultValue: 'open', // could be open, pending and closed
  },
  lotId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'Lot',
      key: 'id',
    },
  },
  startedAt: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.fn('NOW'),
  },
  endedAt: {
    type: DataType.DATE,
  },
  supposedEndsAt: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.literal(`NOW() + interval '15' minute`),
  },
});

Room.getAllData = function getAllData(id, userId) {
  if (!id) return null;
  const include = [
    {
      model: Lot,
      as: 'lot',
      include: [
        {
          model: Bet,
          as: 'bets',
          required: false,
          include: [
            {
              model: User,
              as: 'owner',
              required: false,
            },
          ],
        },
        {
          model: User,
          as: 'owner',
          required: false,
        },
        {
          model: User,
          as: 'purchaser',
          required: false,
        },
      ],
    },
  ];

  if (userId)
    include.push({
      model: RoomToUser,
      as: 'rtu',
      where: {
        userId,
      },
      required: false,
    });
  return Room.findByPk(id, {
    include,
  });
};

export default Room;
