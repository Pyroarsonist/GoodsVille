import DataType from 'sequelize';
import Model from '../sequelize';

const Lot = Model.define('lot', {
  // attributes
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataType.STRING(256),
  },
  shortDescription: {
    type: DataType.STRING(128),
  },
  name: {
    type: DataType.STRING(32),
  },
  startPrice: {
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  currentPrice: {
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  tag: {
    type: DataType.STRING(32),
  },
  ownerId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  purchaserId: {
    type: DataType.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
});

export default Lot;
