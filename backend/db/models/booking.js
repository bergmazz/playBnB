"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });
    }
  }
  Booking.init(
    {
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
    },
    {
      sequelize,
      modelName: "Booking",
      defaultScope: {
        attributes: [
          "id",
          "spotId",
          "userId",
          "startDate",
          "endDate",
          "createdAt",
          "updatedAt",
        ],
      },
      scopes: {
        justDateNoSeconds: {
          attributes: [
            "id",
            "spotId",
            "userId",
            [sequelize.fn("DATE", sequelize.col("startDate")), "startDate"],
            [sequelize.fn("DATE", sequelize.col("endDate")), "endDate"],
            "createdAt",
            "updatedAt",
          ],
        },
        notOwned: {
          attributes: [
            "spotId",
            "startDate",
            "endDate",
            // [sequelize.fn("DATE", sequelize.col("startDate")), "startDate"],
            // [sequelize.fn("DATE", sequelize.col("endDate")), "endDate"],
          ],
        },
      },
    }
  );
  return Booking;
};
