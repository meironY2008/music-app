'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.renameColumn("playlists","playlistName","playlist_name");
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
