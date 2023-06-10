"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        userId: 2,
        spotId: 1,
        review:
          "This spot was awesome! The place was fully childproofed as expected. It exceeded my expectations.",
        stars: 5,
      },
      {
        userId: 1,
        spotId: 2,
        review:
          "The place was so beachy and clean, but unfortunately, my kids hated it. It wasn't their cup of tea.",
        stars: 2,
      },
      {
        userId: 3,
        spotId: 3,
        review:
          "The place was pretty alright. There wasn't anything extraordinary about it, but it was decent.",
        stars: 3,
      },
      {
        userId: 1,
        spotId: 3,
        review:
          "I enjoyed the tiger, but there wasn't much else that caught my attention. It was an average experience.",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 1,
        review:
          "This spot was decent, but it could use some more fairy lights to add some charm to the ambiance.",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 2,
        review:
          "It was great overall, but unfortunately, my child broke their arm. That was the only downside of the experience.",
        stars: 3,
      },
      {
        userId: 1,
        spotId: 4,
        review:
          "This spot was absolutely fantastic! I had a blast with my family and would definitely recommend it to others.",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 4,
        review:
          "The experience was just 'meh' for me. There wasn't anything particularly special or memorable about it.",
        stars: 3,
      },
      {
        userId: 2,
        spotId: 5,
        review:
          "The seahorse was pretty cool, and overall, the experience was enjoyable. It's definitely worth checking out.",
        stars: 4,
      },
      {
        userId: 3,
        spotId: 6,
        review:
          "The experience was AMAZING! My child quite literally went to space and back in our one-week trip. It was unforgettable.",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 7,
        review:
          "It was a little too wild for my taste, and I wasn't comfortable with the level of activity. It was a bit overwhelming.",
        stars: 2,
      },
      {
        userId: 2,
        spotId: 8,
        review:
          "It was absolutely incredible that they left a straight-up elephant here for the kids to play with! However, the clowns hiding everywhere were a bit unsettling.",
        stars: 3,
      },
      {
        userId: 1,
        spotId: 9,
        review:
          "My child won't stop asking when we're going back, and it's pretty annoying. Nevertheless, it was a great experience overall.",
        stars: 4,
      },
      {
        userId: 1,
        spotId: 10,
        review:
          "The experience was 'mehhhhhhhhhhhhhhhhhhhh' for me. It wasn't the worst, but it definitely wasn't the best either.",
        stars: 2,
      },
    ]);
    //   {
    //     userId: 2,
    //     spotId: 1,
    //     review: "This was an awesome spot! Fully childproofed as expected",
    //     stars: 5,
    //       },
    //   {
    //     userId: 1,
    //     spotId: 2,
    //     review: "so beachy and clean, my kids hated it",
    //     stars: 2,
    //   },
    //   {
    //     userId: 3,
    //     spotId: 3,
    //     review: "Pretty alright",
    //     stars: 3,
    //   },
    //   {
    //     userId: 1,
    //     spotId: 3,
    //     review: "Enjoyed the tiger, not much else",
    //     stars: 3,
    //       },
    //       {
    //             userId: 3,
    //             spotId: 1,
    //             review: "This was a decent spot, needs more fairy lights",
    //             stars: 4,
    //       },
    //       {
    //             userId: 2,
    //             spotId: 2,
    //             review: "it was great except for my child breaking their arm",
    //             stars: 3,
    //       },
    //       {
    //             userId: 1,
    //             spotId: 4,
    //             review: "fantaaaaaaaaaaaaaastic",
    //             stars: 5,
    //       },
    //       {
    //             userId: 3,
    //             spotId: 4,
    //             review: "meh",
    //             stars: 3,
    //       },
    //       {
    //             userId: 2,
    //             spotId: 5,
    //             review: "pretty cool seahorse tbh",
    //             stars: 4,
    //       },
    //       {
    //             userId: 3,
    //             spotId: 6,
    //             review: "AMAZING, my child quite literally went to space and back in our one week trip",
    //             stars: 5,
    //       },
    //       {
    //             userId: 2,
    //             spotId: 7,
    //             review: "a little too wild......",
    //             stars: 2,
    //       },
    //       {
    //             userId: 2,
    //             spotId: 8,
    //             review: "absolutely incredible that theyd leave a straight up elephant here for the kids to play with..... not really sure what was up with the clowns hiding everywhere",
    //             stars: 3,
    //       },
    //       {
    //             userId: 1,
    //             spotId: 9,
    //             review: "my child will not stop asking when we're going back its pretty annoying",
    //             stars: 4,
    //       },
    //       {
    //             userId: 1,
    //             spotId: 10,
    //             review: "mehhhhhhhhhhhhhhhhhhhh",
    //             stars: 2,
    //       },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    //  const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  },
};
