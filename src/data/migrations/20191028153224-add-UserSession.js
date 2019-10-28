module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserSession', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      cookie: {
        type: Sequelize.STRING(64),
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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

  down: queryInterface => queryInterface.dropTable('UserSession'),
};
