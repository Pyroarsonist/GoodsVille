import DataType from 'sequelize';
import Model from '../sequelize';

const Notification = Model.define('notification', {
  // attributes
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
    defaultValue: 'info', // // could be info, warning, error or success
  },
});

export default Notification;
