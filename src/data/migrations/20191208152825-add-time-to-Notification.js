module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Notification', 'time', {
      type: Sequelize.INTEGER,
    }),

  down: queryInterface => queryInterface.removeColumn('Notification', 'time'),
};
