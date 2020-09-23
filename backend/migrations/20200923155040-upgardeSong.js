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
      lyrics: {
        type: Sequelize.TEXT
      },
      releasedAt: {
        type: Sequelize.DATEONLY,
        field: "realeased_at"
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
    await queryInterface.dropTable('Songs');
  }
};
