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
                userId: 2,
                spotId: 1,
                review: "This was an awesome spot!",
                stars: 5,
              },
              {
                userId: 1,
                spotId: 2,
                review: "Excessive food waste",
                stars: 2,
              },
              {
                userId: 3,
                spotId: 3,
                review: "Pretty alright",
                stars: 3,
              },
              {
                userId: 1,
                spotId: 3,
                review: "Enjoyed the robot",
                stars: 3,
              },
            ]);
  },

  async down (queryInterface, Sequelize) {
 options.tableName = "Reviews";
//  const Op = Sequelize.Op;
 await queryInterface.bulkDelete(options, null, {});
  }
};
