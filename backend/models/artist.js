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
      this.hasMany(models.Song);
      this.hasMany(models.Album);
      // define association here
    }
  };
  Artist.init({
    artisrName:{type: DataTypes.STRING, field:"Artist_Name"},
    coverImg:{ type: DataTypes.STRING,field:"Cover_img"},
    uploadedAt:{ type: DataTypes.DATE, field:"uploaded_at"}
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};