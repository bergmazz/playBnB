'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
            options.tableName = "Reviews";
            return queryInterface.bulkInsert(options, [
              {
                id: 1,
                userId: 1,
                spotId: 1,
                review: "This was an awesome spot!",
                stars: 5,
              },
            ]);
  },

  async down (queryInterface, Sequelize) {
 options.tableName = "Spots";
 const Op = Sequelize.Op;
 await queryInterface.bulkDelete(options, null, {});
  }
};
