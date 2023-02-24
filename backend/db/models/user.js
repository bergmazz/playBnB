"use strict";
const { Model, Validator } = require( "sequelize" );
const bcrypt = require("bcryptjs");


module.exports = (sequelize, DataTypes) => {
class User extends Model {
  toSafeObject() {
    const { id, firstName, lastName, username, email } = this;
    return { id, firstName, lastName, email, username };
  }

  validatePassword(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }
// get current user // aka get currentUser
  static getCurrentUserById(id) {
    return User.scope("currentUser").findByPk(id);
  }

  static async login({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  }

  static async signup({ username, email, password, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      hashedPassword,
    });
    return await User.scope("currentUser").findByPk(user.id);
  }

  static associate(models) {
     User.hasMany(models.Spot, {
       foreignKey: "ownerId",
       as: "OwnedSpots", // creates getOwnedSpots method
       onDelete: "CASCADE",
       hooks: true,
     });
      User.hasMany(models.Review, {
        foreignKey: "userId",
        onDelete: "cascade",
        hooks: true,
      });
      User.hasMany(models.Booking, {
        foreignKey: "userId",
        onDelete: "cascade",
        hooks: true,
      });
  }
}

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      // createdAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      //   //   defaultValue: "CURRENT_TIMESTAMP",  ////not sure syntax and is populating correctly
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: DataTypes.DATE,
      //   //   defaultValue: "CURRENT_TIMESTAMP", ////not sure syntax and is populating correctly
      // },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
        forBooking: {
          attributes: {
            exclude: ["hashedPassword", "username","email", "createdAt", "updatedAt"],
          },
        },
      },
    }
  );
  return User;
};
