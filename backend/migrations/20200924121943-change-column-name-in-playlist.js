'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.renameColumn("users","updatedAt","updated_at");
   await queryInterface.renameColumn("users","createdAt","created_at");
   await queryInterface.renameColumn("users","remeberToken","remeber_token");
   await queryInterface.renameColumn("users","isAdmin","is_admin");
   await queryInterface.renameColumn("users","userName","user_name");
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
