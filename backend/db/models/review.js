'use strict';
const {
  Model
} = require( 'sequelize' );

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static associate(models) {
          Review.belongsTo( models.User, {
                foreignKey: "userId"
          } );
          Review.belongsTo( models.Spot, {
                foreignKey: "spotId",
            //     onDelete: "CASCADE" //pretty sure this caused following errors
            //     ERROR: cannot drop table airbnb."Spots" because other objects depend on it
            //        ERROR DETAIL: constraint Reviews_spotId_fkey on table airbnb."Reviews" depends on table airbnb."Spots"
          } );
       Review.hasMany(models.ReviewImage, {
         foreignKey: "reviewId",
         onDelete: "cascade",
         hooks: true,
       });
    }
  }
  Review.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 5,
          min: 1,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
      defaultScope: {
        attributes: {
          include: [
            "id",
            "userId",
            "spotId",
            "review",
            "stars",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      scopes: {
        perSpot: {
          include: [
            {
              association: "User",
              required: false,
              attributes: ["id", "firstName", "lastName"],
            },
            {
              association: "ReviewImages",
              required: false,
              attributes: ["id", "url"],
            },
          ],
        },
      //   justWordnStar: {
      //     attributes: {
      //       include: [
      //         "review",
      //         "stars",
      //       ],
      //     },
      //   },
      },
    }
  );
  return Review;
};
