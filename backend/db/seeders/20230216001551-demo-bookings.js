'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
      async up ( queryInterface, Sequelize ) {
            options.tableName = "Bookings";
            return queryInterface.bulkInsert( options, [
                  {
                        userId: 2,
                        spotId: 1,
                        startDate: "2021-11-19",
                        endDate: "2021-11-20"
                  },
                  {
                        userId: 1,
                        spotId: 2,
                        startDate: "2022-12-19",
                        endDate: "2022-12-20"
                  },
                  {
                        userId: 3,
                        spotId: 3,
                        startDate: "2023-10-11",
                        endDate: "2022-10-13"
                  },
                  {
                        userId: 1,
                        spotId: 3,
                        startDate: "2022-11-10",
                        endDate: "2022-11-11"
                  }
            ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.dropTable(options, null, {});
  }
};
