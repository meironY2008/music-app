'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('Songs');
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.INTEGER
      },
      artist_id: {
        type: Sequelize.INTEGER
      },
      album_id: {
        type: Sequelize.INTEGER
      },
      lyrics: {
        type: Sequelize.TEXT
      },
      released_at: {
        type: Sequelize.DATEONLY,
        field: "realeased_at"
      },
      uploaded_at: {
        type: Sequelize.DATEONLY,
        field: "uploaded_at"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at"
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs');
  }
};
