import DataType from 'sequelize';
import Model from '../sequelize';

const Room = Model.define('room', {
  // attributes
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
});

export default Room;
