module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Notification', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      message: {
        type: Sequelize.STRING(128),
      },
      level: {
        type: Sequelize.STRING(16),
        allowNull: false,
        defaultValue: 'info', // // could be info, warning, error or success
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    }),

  down: queryInterface => queryInterface.dropTable('Notification'),
};
