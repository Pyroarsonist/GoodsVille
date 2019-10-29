import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define('user', {
  // attributes
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  nickName: {
    type: DataType.STRING(32),
  },
  password: {
    type: DataType.STRING(32),
  },
  balance: {
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  fullName: {
    type: DataType.STRING(128),
  },
  email: {
    type: DataType.STRING(64),
  },
});

export default User;
