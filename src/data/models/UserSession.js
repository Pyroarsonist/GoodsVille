import DataType from 'sequelize';
import Model from '../sequelize';

const UserSession = Model.define('UserSession', {
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  cookie: {
    type: DataType.STRING(64),
  },
  expiresAt: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.fn('NOW'),
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
});

export default UserSession;
