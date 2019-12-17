module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Room', 'supposedEndsAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(`NOW() + interval '15' minute`),
    }),

  down: queryInterface => queryInterface.removeColumn('Room', 'supposedEndsAt'),
};
