"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(options, [
      {
        userId: 2,
        spotId: 1,
        startDate: new Date("2021-11-19").toISOString().slice(0, 10),
        endDate: new Date("2021-11-20").toISOString().slice(0, 10),
      },
      {
        userId: 1,
        spotId: 2,
        startDate: new Date("2022-12-19").toISOString().slice(0, 10),
        endDate: new Date("2022-12-20").toISOString().slice(0, 10),
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date("2023-10-11").toISOString().slice(0, 10),
        endDate: new Date("2022-10-13").toISOString().slice(0, 10),
      },
      {
        userId: 1,
        spotId: 3,
        startDate: new Date("2022-11-10").toISOString().slice(0, 10),
        endDate: new Date("2022-11-11").toISOString().slice(0, 10),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.bulkDelete(options, null, {});
  },
};
