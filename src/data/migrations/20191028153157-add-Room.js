module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Room', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      status: {
        type: Sequelize.STRING(32),
        allowNull: false,
        defaultValue: 'open', // could be open, pending and closed
      },
      lotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Lot',
          key: 'id',
        },
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      endedAt: {
        type: Sequelize.DATE,
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

  down: queryInterface => queryInterface.dropTable('Room'),
};
