'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "Owner",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "cascade",
        hooks: true,
      });
      // Spot.hasMany(models.SpotImage, {
      //   foreignKey: "spotId",
      //   onDelete: "cascade",
      //   hooks: true,
      // });
      // Spot.hasMany(models.Booking, {
      //   foreignKey: "spotId",
      //   onDelete: "cascade",
      //   hooks: true,
      // });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
        //   validate: {
        //       min: -90,
        //       max: 90
        // }
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
        //       validate: {
        //       min: -180,
        //       max: 180
        // }
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 50],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Spot",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Spot;
};
