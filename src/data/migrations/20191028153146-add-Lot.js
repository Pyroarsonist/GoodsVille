module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Lot', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      description: { type: Sequelize.STRING(256) },
      shortDescription: { type: Sequelize.STRING(128) },
      name: { type: Sequelize.STRING(32) },
      startPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      currentPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tag: { type: Sequelize.STRING(32) },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      purchaserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    }),

  down: queryInterface => queryInterface.dropTable('Lot'),
};
