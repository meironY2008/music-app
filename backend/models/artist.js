'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Song,{
        foreignKey:'artistId',
        as:'songs'
      });
      this.hasMany(models.Album,{
        foreignKey:'artistId',
        as:'albums'
      });
      // define association here
    }
  };
  Artist.init({
    artistName:{type: DataTypes.STRING, field:"Artist_Name"},
    coverImg:{ type: DataTypes.STRING,field:"Cover_img"},
    uploadedAt:{ type: DataTypes.DATE, field:"uploaded_at"}
  }, {
    paranoid:true,
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};