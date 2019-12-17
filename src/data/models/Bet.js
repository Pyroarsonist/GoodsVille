import DataType from 'sequelize';
import Model from '../sequelize';

const Bet = Model.define(
  'Bet',
  {
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
  },
  {
    hooks: {
      beforeValidate(bet) {
        if (bet.changed('price') && bet.price < 0)
          throw new Error('totalLimit must be not less than 0');
      },
    },
  },
);

export default Bet;
