'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {



    static associate(models) {
          Spot.belongsTo(models.User, {
            as: "Owner",
            foreignKey: "ownerId",
          });

          Spot.hasMany(models.Review, {
            foreignKey: "spotId",
            onDelete: "cascade",
            hooks: true,
          } );

          Spot.hasMany(models.SpotImage, {
            foreignKey: "spotId",
            onDelete: "cascade",
            hooks: true,
          } );

          Spot.hasMany(models.Booking, {
            foreignKey: "spotId",
            onDelete: "cascade",
            hooks: true,
          } );

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
        validate: {
          min: -90,
          max: 90,
        },
      },
      lng: {
        type: DataTypes.FLOAT,
        validate: {
          min: -180,
          max: 180,
        },
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
        type: DataTypes.NUMERIC,
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
        include: [
          {
            //gotta include the models in order for fn to recognize the columns
            association: "Reviews",
            required: false,
            attributes: [],
          },
          {
            association: "SpotImages",
            required: false,
            where: { preview: true },
            attributes: [],
          },
        ],
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "description",
          "price",
          "createdAt",
          "updatedAt",
          [
            sequelize.fn(
              "COALESCE", //returns the first non-null value in a list
              sequelize.fn("AVG", sequelize.col("Reviews.stars")),
              0
            ), //If no reviews for a spot,  return 0 as a default value //returning a message broke it
            "avgRating",
          ],
          [
            sequelize.fn(
              "COALESCE",
              sequelize.col("SpotImages.url"),
              sequelize.literal("'image preview unavailable'")
            ),
            "previewImage",
          ],
        ],
      },
      scopes: {
        allDetails: {
          include: [
            {
              association: "Owner",
              required: false,
              attributes: ["id", "firstName", "lastName"],
            },
            {
              association: "SpotImages",
              required: false,
              attributes: ["id", "url", "preview"],
            },
            {
              association: "Reviews",
              required: false,
              attributes: [],
            },
          ],
          attributes: [
            [
              sequelize.fn(
                "COALESCE",
                sequelize.fn("COUNT", sequelize.col("Reviews.id")),
                0
              ), //If no reviews for a spot,  return 0 as a default value
              "numReviews",
            ],
          ],
        },
        lessDetail: {
          attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    }
  );
  return Spot;
};
