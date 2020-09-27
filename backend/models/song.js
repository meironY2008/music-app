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
        foreignKey:'artistId',
        onDelete: 'cascade'
      })
      this.belongsTo(models.Album,{
        foreignKey:'albumId',
        onDelete: 'cascade'
      })
      this.hasMany(models.Library,{
        foreignKey:'songId'
      })
    }
  };
  Song.init({
    title: DataTypes.STRING,
    youTube: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    trackNumber:DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    releasedAt: DataTypes.DATE, 
    uploadedAt: DataTypes.DATE
  },
  {
    paranoid:true,
    sequelize,
    modelName: 'Song',
  });
  return Song;
};