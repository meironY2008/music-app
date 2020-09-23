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
      this.hasMany(models.Song);
    }
  };
  Album.init({
    albumName: {
      type: DataTypes.STRING,
      field: "album_name"
    },
    artistId: {
      type: DataTypes.INTEGER,
      field: "artist_id"
    },
    coverImg: {
      type: DataTypes.STRING,
      field: "cover_img"
    },
    releasedAt: {
      type: DataTypes.DATE,
      field: "released_at"
    },
    uploadedAt: {
      type: DataTypes.DATE,
      field: "uploaded_at"
    }
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
