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
                review: "This was an awesome spot! Fully childproofed as expected",
                stars: 5,
                  },
              {
                userId: 1,
                spotId: 2,
                review: "so beachy and clean, my kids hated it",
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
                review: "Enjoyed the tiger, not much else",
                stars: 3,
                  },
                  {
                        userId: 3,
                        spotId: 1,
                        review: "This was a decent spot, needs more fairy lights",
                        stars: 4,
                  },
                  {
                        userId: 2,
                        spotId: 2,
                        review: "it was great except for my child breaking their arm",
                        stars: 3,
                  },
                  {
                        userId: 1,
                        spotId: 4,
                        review: "fantaaaaaaaaaaaaaastic",
                        stars: 5,
                  },
                  {
                        userId: 3,
                        spotId: 4,
                        review: "meh",
                        stars: 3,
                  },
                  {
                        userId: 2,
                        spotId: 5,
                        review: "pretty cool seahorse tbh",
                        stars: 4,
                  },
                  {
                        userId: 3,
                        spotId: 6,
                        review: "AMAZING, my child quite literally went to space and back in our one week trip",
                        stars: 5,
                  },
                  {
                        userId: 2,
                        spotId: 7,
                        review: "a little too wild......",
                        stars: 2,
                  },
                  {
                        userId: 2,
                        spotId: 8,
                        review: "absolutely incredible that theyd leave a straight up elephant here for the kids to play with..... not really sure what was up with the clowns hiding everywhere",
                        stars: 3,
                  },
                  {
                        userId: 1,
                        spotId: 9,
                        review: "my child will not stop asking when we're going back its pretty annoying",
                        stars: 4,
                  },
                  {
                        userId: 1,
                        spotId: 10,
                        review: "mehhhhhhhhhhhhhhhhhhhh",
                        stars: 2,
                  },
            ]);
  },

  async down (queryInterface, Sequelize) {
 options.tableName = "Reviews";
//  const Op = Sequelize.Op;
 await queryInterface.bulkDelete(options, null, {});
  }
};
