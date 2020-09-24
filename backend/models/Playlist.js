'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Library, {
        foreignKey:'playlistId'
      })
    }
  };
  Playlist.init({
    playlistName: DataTypes.STRING,
    coverImg: DataTypes.STRING,
    createdAt: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};