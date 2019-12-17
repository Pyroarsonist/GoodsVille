import DataType from 'sequelize';
import Model from '../sequelize';

const Notification = Model.define(
  'Notification',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataType.STRING(128),
    },
    level: {
      type: DataType.STRING(16),
      allowNull: false,
      defaultValue: 'info', // could be info, warning, error or success
    },
    time: {
      type: DataType.INTEGER,
    },
    roomId: {
      type: DataType.INTEGER,
      references: {
        model: 'Room',
        key: 'id',
      },
    },
  },
  { updatedAt: false },
);

export default Notification;
