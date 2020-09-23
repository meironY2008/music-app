'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: "album_id"
      },
      albumName: {
        type: Sequelize.STRING,
        field: "album_name"
      },
      artistId: {
        type: Sequelize.INTEGER,
        field: "artist_id"
      },
      coverImg: {
        type: Sequelize.STRING,
        field: "cover_img"
      },
      releasedAt: {
        type: Sequelize.DATEONLY,
        field: "released_at"
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
    await queryInterface.dropTable('Albums');
  }
};