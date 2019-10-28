module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('User', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      password: { type: Sequelize.STRING(128) },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      nickName: {
        type: Sequelize.STRING(32),
      },
      fullName: {
        type: Sequelize.STRING(128),
      },
      email: {
        type: Sequelize.STRING(64),
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

  down: queryInterface => queryInterface.dropTable('User'),
};
