import DataType from 'sequelize';
import Model from '../sequelize';

const RoomToUser = Model.define('RoomToUser', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  roomId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'Room',
      key: 'id',
    },
  },
  involved: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default RoomToUser;
