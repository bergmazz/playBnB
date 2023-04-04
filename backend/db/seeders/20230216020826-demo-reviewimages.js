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
             url: 'https://media.istockphoto.com/id/507923189/photo/twinkle-toes.jpg?b=1&s=612x612&w=0&k=20&c=lJPQFqVD-R-7HbEsB8jeGdjksEaHLv2sRDMNxy3laeg='
   },
   {
     reviewId: 2,
         url: "https://images.pexels.com/photos/14283365/pexels-photo-14283365.jpeg?auto=compress&cs=tinysrgb&w=600"
   },
   {
     reviewId: 3,
         url: 'https://media.istockphoto.com/id/1000993952/photo/explorer-kids-walking-through-the-jungle.jpg?b=1&s=612x612&w=0&k=20&c=zWA4QVf4SbTZp3S6eeMu1Qcn7-C1INJtFggo3i5lRcE='
   },
   {
     reviewId: 4,
         url: "https://images.pexels.com/photos/2411916/pexels-photo-2411916.jpeg?auto=compress&cs=tinysrgb&w=600",
   },
 ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    await queryInterface.bulkDelete(options, null, {});
  }
};
