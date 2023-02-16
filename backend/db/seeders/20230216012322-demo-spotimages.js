'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = "SpotImages";
 return queryInterface.bulkInsert(
   options,
   [
     {
       spotId: 1,
       preview: true,
       url: "assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5faae1191b673c881b077e1f_ogaa-min.png",
     },
     {
       spotId: 2,
       preview: true,
       url: "images.contentstack.io/v3/assets/bltb428ce5d46f8efd8/blt163f6c374ab5b090/5e1cc881b282e90da2c90cb1/020619-Plus_Host-Kelly-02287_JL1.jpg?crop=100p,84p,x0,y15p&width=720&height=405&auto=webp",
     },
     {
       spotId: 2,
       preview: false,
       url: "cdn.home-designing.com/wp-content/uploads/2022/03/sophisticated-table-centerpiece-ideas-for-home-affordable-high-end-designer-vases-double-sided-matte-colorful-glass-footed-bowl-and-vase-set-terracotta-coloration.jpg",
     },
     {
       spotId: 3,
       preview: true,
       url: "substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F03c041e5-05d4-4cae-b8ec-4e68dc6fbea0_1280x720.jpeg",
     },
   ],
   options
 );
  },

  async down (queryInterface, Sequelize) {
   options.tableName = "SpotImages";
   await queryInterface.dropTable(options);
  }
};
