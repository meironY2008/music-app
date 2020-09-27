'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Library,{
        foreignKey:'userId'
          }
        )
    }
  };
  User.init({
    userName:{ type:DataTypes.STRING,unique:true },
    email:{ type:DataTypes.STRING,unique:true },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    preferences: DataTypes.JSON,
    remeberToken: DataTypes.BOOLEAN
  }, {
    paranoid:true,
    sequelize,
    modelName: 'User',
  });
  return User;
};