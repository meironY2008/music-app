'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Artists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "artist_id"
      },
      artistName: {
        type: Sequelize.STRING,
        field: "artist_name"
      },
      coverImg: {
        type: Sequelize.STRING,
        field:"cover_img"
      },
      uploadedAt: {
        type: Sequelize.DATEONLY,
        field: "uploaded_at"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Artists');
  }
};
