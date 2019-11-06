module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Bet', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.STRING(32),
        allowNull: false,
        defaultValue: 'highest', // could be highest, overbid, failed and successful
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      lotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Lot',
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

  down: queryInterface => queryInterface.dropTable('Bet'),
};
