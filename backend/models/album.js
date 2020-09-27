'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId'
      });
      this.hasMany(models.Song,{
        foreignKey:'albumId',
        as:'songs'
        // onDelete:'cascade'
      });
    }
  };
  Album.init({
    albumName: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    coverImg: DataTypes.STRING,
    releasedAt: DataTypes.DATEONLY,
    uploadedAt: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Album',
    paranoid:true
  });
  return Album;
};
