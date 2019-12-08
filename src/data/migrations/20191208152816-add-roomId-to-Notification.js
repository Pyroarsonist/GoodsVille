module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Notification', 'roomId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Room',
        key: 'id',
      },
    }),

  down: queryInterface => queryInterface.removeColumn('Notification', 'roomId'),
};
