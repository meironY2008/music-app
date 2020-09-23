'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Songs","artist_id",Sequelize.INTEGER ,{
      after:"title"
    })
    await queryInterface.addColumn("Songs","album_id",Sequelize.INTEGER ,{
      after:"artist_id"
    })
    await queryInterface.addColumn("Songs","YouTube",Sequelize.STRING ,{
      after:"lyrics"
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
