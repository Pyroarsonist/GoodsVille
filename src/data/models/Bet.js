import DataType from 'sequelize';
import Model from '../sequelize';

const Bet = Model.define('bet', {
  // attributes
  id: {
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataType.STRING(32),
    allowNull: false,
    defaultValue: 'highest', // could be highest, overbid, failed and successful
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  lotId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'Lot',
      key: 'id',
    },
  },
});

export default Bet;
