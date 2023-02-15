'use strict';

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
 options.tableName = "Spots";
 return queryInterface.bulkInsert(
   options,
   [
     {
       ownerId: 1,
       address: "123 Disney Lane",
       city: "San Francisco",
       state: "California",
       country: "United States of America",
       lat: 37.7645358,
       lng: -122.4730327,
       name: "App Academy",
       description: "Place where web developers are created",
       price: 123.45,
      //  createdAt: "2021-11-19 20:39:36",
      //  updatedAt: "2021-11-19 20:39:36",
     },
     {
       ownerId: 3,
       address: "335 Fruit Grove",
       city: "Atlanta",
       state: "Georgia",
       country: "United States of America",
       lat: 33.7488,
       lng: 84.3877,
       name: "Sanctuary",
       description:
         "Contains bowls overflowing with fruit.",
       price: 99.99,
     },
     {
       ownerId: 2,
       address: "888 Beep Boop Street",
       city: "Wilmington",
       state: "North Carolina",
       country: "United States of America",
       lat: 34.2104,
       lng: 77.8868,
       name: "Robot Central",
       description: "Straight up Jetsons vibes",
       price: 6000.00,
     },
   ],
   {}
 );
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
