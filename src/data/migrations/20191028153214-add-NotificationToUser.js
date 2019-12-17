module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('NotificationToUser', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      notificationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Notification',
          key: 'id',
        },
      },
      checked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

  down: queryInterface => queryInterface.dropTable('NotificationToUser'),
};
