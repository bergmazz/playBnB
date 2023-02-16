'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up (queryInterface, Sequelize) {
 options.tableName = "ReviewImages";
 return queryInterface.bulkInsert(options, [
   {
     reviewId: 1,
     url: 'media.wired.com/photos/5ca648a330f00e47fd82ae77/16:9/w_1391,h_782,c_limit/Culture_Matrix_Code_corridor.jpg'
   },
   {
     reviewId: 2,
     url: "media.istockphoto.com/id/185113827/photo/child-playing-with-healthy-a-fruit-basket.jpg?s=612x612&w=0&k=20&c=xgXUS1rdxfQoVi2c5S1dDX89Q-dsPQ3SKA3brg6vQp8="
   },
   {
     reviewId: 3,
     url: 'www.homecinemachoice.com/sites/18/images/article_images_month/2015-09/chappie%2003.jpg'
   },
   {
     reviewId: 4,
     url: "encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKscQQGJBhq8bT6jskTWMYZuXVqtQmv_tVPMuxwVXPVxA-T0oAal3TRskPcjeS8G-Hkmg&usqp=CAU",
   },
 ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    await queryInterface.bulkDelete(options, null, {});
  }
};
