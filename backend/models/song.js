'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist,{
        foreignKey:'artistId'
      })
      this.belongsTo(models.Album,{
        foreignKey:'albumId'
      })
    }
  };
  Song.init({
    title:{
      type: DataTypes.STRING,
      field:"Title"
    },
    YouTube:{
      type: DataTypes.STRING,
      field:"YouTube"
    },
    artistId:{
      type: DataTypes.INTEGER,
      field:"artist_id"
    },
    length: DataTypes.INTEGER,
    trackNumber: {
      type: DataTypes.INTEGER,
      field: "track_number"
    },
    lyrics: DataTypes.TEXT,
    releasedAt: {
      type: DataTypes.DATE,
      field: "released_at"
    },
    uploadedAt: {
      type: DataTypes.DATE,
      field: "uploaded_at"
    },
    createdAt: {
      type: DataTypes.DATETIME,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATETIME,
      field: "updated_at"
    }

  },
  {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};