import DataType from 'sequelize';
import md5 from 'md5';
import Model from '../sequelize';

const User = Model.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
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

User.prototype.verifyPassport = function verifyPassport(passwordToMatch) {
  return md5(passwordToMatch) === this.password;
};

User.createInstance = async function createInstance(email, password) {
  const user = await User.create({ email, password: md5(password) });
  return user;
};

export default User;
