'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      // define association here
    }
  }
  Spot.init({
        ownerId: {
              type: DataTypes.INTEGER
        },
        address: {
              type: DataTypes.STRING,
        },
        city: {
              type: DataTypes.STRING,
        },
        state: {
              type: DataTypes.STRING,
        },
        country: {
              type: DataTypes.STRING,
        },
        lat: {
              type: DataTypes.FLOAT,
        },
        lng: {
              type: DataTypes.FLOAT,
        },
        name: {
              type: DataTypes.STRING,
        },
        description: {
              type: DataTypes.STRING,
        },
        price: {
              type: DataTypes.NUMERIC
        },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
