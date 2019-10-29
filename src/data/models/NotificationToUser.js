import DataType from 'sequelize';
import Model from '../sequelize';

const NotificationToUser = Model.define('notificationToUser', {
  // attributes
  id: {
    type: DataType.BIGINT,
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
  notificationId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'Notification',
      key: 'id',
    },
  },
  checked: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default NotificationToUser;
