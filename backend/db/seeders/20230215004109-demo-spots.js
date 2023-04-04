'use strict';

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
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


    await queryInterface.bulkDelete(options, null, {});
  }
};


// "Enchanted Forest Cottage" - A magical treehouse with a slide and a fairy garden.
// "Beach Bungalow with a Twist" - A colorful beach house with a pirate ship play area and a mermaid - themed bedroom.
// "Jungle Safari Lodge" - A wildlife - themed lodge with a mini - zoo and a jungle - themed playroom.
// "Princess Castle" - A castle with a princess - themed bedroom and a dress - up area.
// "Underwater Adventure" - An underwater - themed apartment with a submarine - shaped bed and a coral reef play area.
// "Space Station" - A space - themed rental with a rocket ship play area and a planetarium.
// "Wild West Ranch" - A cowboy - themed ranch with a horse stable and a saloon play area.
// "Circus Tent" - A circus - themed tent with a tightrope and a trapeze.
// "Dinosaur Den" - A prehistoric - themed rental with a dinosaur fossil dig site and a T - Rex playhouse.
// "Fairy Tale Cottage" - A storybook cottage with a Hansel and Gretel - themed bedroom and a gingerbread house play area.
// "Medieval Castle" - A castle with a knight's armor dress-up area and a dragon's lair playhouse.
// "Pirate's Cove" - A pirate - themed rental with a ship - shaped bed and a treasure chest play area.
// "Safari Tent" - A tent with a safari - themed bedroom and a mock safari jeep for kids to play in.
// "Superhero Lair" - A superhero - themed rental with a superhero costume closet and a batcave play area.
// "Treehouse Retreat" - A luxury treehouse with a treehouse - themed bedroom and a zip line.
// "Tropical Paradise" - A tropical - themed rental with a pool and a tiki hut play area.
// "Wizards' Den" - A wizard - themed rental with a magic wand - making station and a Hogwarts - themed bedroom.
// "Construction Zone" - A construction - themed rental with a hard hat dress - up area and a Bob the Builder play area.
// "Mermaid's Cove" - A mermaid - themed rental with a mermaid tail - making workshop and a coral reef play area.
// "Outer Space Oasis" - A space - themed rental with a planetarium and a spaceship play area.


// [
//       {
//             ownerId: 1,
//             address: "123 Magic Lane",
//             city: "Orlando",
//             state: "Florida",
//             country: "United States of America",
//             lat: 28.5383,
//             lng: -81.3792,
//             name: "Enchanted Forest Cottage",
//             description: "A magical treehouse with a slide and a fairy garden.",
//             price: 350.00,
//       },
//       {
//             ownerId: 3,
//             address: "524 Beach Road",
//             city: "Malibu",
//             state: "California",
//             country: "United States of America",
//             lat: 34.0259,
//             lng: -118.7798,
//             name: "Beach Bungalow with a Twist",
//             description:
//                   "A colorful beach house with a pirate ship play area and a mermaid-themed bedroom.",
//             price: 550.00,
//       },
//       {
//             ownerId: 2,
//             address: "439 Safari Lane",
//             city: "Austin",
//             state: "Texas",
//             country: "United States of America",
//             lat: 30.2672,
//             lng: -97.7431,
//             name: "Jungle Safari Lodge",
//             description:
//                   "A wildlife-themed lodge with a mini-zoo and a jungle-themed playroom.",
//             price: 450.00,
//       },
//       {
//             ownerId: 2,
//             address: "720 Princess Street",
//             city: "Savannah",
//             state: "Georgia",
//             country: "United States of America",
//             lat: 32.0809,
//             lng: -81.0912,
//             name: "Princess Castle",
//             description: "A castle with a princess-themed bedroom and a dress-up area.",
//             price: 600.00,
//       },
//       {
//             ownerId: 6,
//             address: "80 Coral Reef Blvd",
//             city: "Honolulu",
//             state: "Hawaii",
//             country: "United States of America",
//             lat: 21.3069,
//             lng: -157.8583,
//             name: "Underwater Adventure",
//             description:
//                   "An underwater-themed apartment with a submarine-shaped bed and a coral reef play area.",
//             price: 250.00,
//       },
//       {
//             ownerId: 4,
//             address: "567 Space Avenue",
//             city: "Houston",
//             state: "Texas",
//             country: "United States of America",
//             lat: 29.7604,
//             lng: -95.3698,
//             name: "Space Station",
//             description:
//                   "A space-themed rental with a rocket ship play area and a planetarium.",
//             price: 400.00,
//       },
//       {
//             ownerId: 7,
//             address: "123 Rodeo Drive",
//             city: "Bozeman",
//             state: "Montana",
//             country: "United States of America",
//             lat: 45.6770,
//             lng: -111.0429,
//             name: "Wild West Ranch",
//             description:
//                   "A cowboy-themed ranch with a horse stable and a saloon play area.",
//             price: 500.00,
//       },
//       {
//             ownerId: 1,
//             address: "890 Circus Lane",
//             city: "Tampa",
//             state: "Florida",
//             country: "United States of America",
//             lat: 27.9506,
//             lng: -82.4572,
//             name: "Circus Tent",
//             description:
//                   "A circus-themed tent with a tightrope and a trapeze.",
//             price: 150.00,
//       },
//       {
//             ownerId: 9,
//             address: "321 Dino Road",
//             city: "Denver",
//             state: "Colorado",
//             country: "United States of America",
//             lat: 39.7392,
//             lng: -104.9903,
//             name: "Dinosaur Den",
//             description:
//                   "A prehistoric-themed rental with a dinosaur fossil dig site and a T-Rex playhouse.",
//             price: 300.00,
//       },
//       {
//             ownerId: 6,
//             address: "456 Fairy Tale Lane",
//             city: "Portland",
//             state: "Oregon",
//             country: "United States of America",
//             lat: 45.5231,
//             lng: -122.6765,
//             name: "Fairy Tale Cottage",
//             description:
//                   "A storybook cottage with a Hansel and Gretel-themed bedroom and a gingerbread house play area.",
//             price: 200.00,
//       },
//       {
//             ownerId: 7,
//             address: "456 King's Road",
//             city: "Charleston",
//             state: "South Carolina",
//             country: "United States of America",
//             lat: 32.7765,
//             lng: 79.9311,
//             name: "Medieval Castle",
//             description: "Live like a knight in this castle with dragon's lair playhouse",
//             price: 250.00,
//       },
//       {
//             ownerId: 10,
//             address: "101 Blackbeard's Way",
//             city: "Tampa",
//             state: "Florida",
//             country: "United States of America",
//             lat: 27.9506,
//             lng: 82.4572,
//             name: "Pirate's Cove",
//             description: "Shiver me timbers! A pirate-themed rental with a ship-shaped bed",
//             price: 175.00,
//       },
//       {
//             ownerId: 9,
//             address: "77 Safari Lane",
//             city: "Denver",
//             state: "Colorado",
//             country: "United States of America",
//             lat: 39.7392,
//             lng: 104.9903,
//             name: "Safari Tent",
//             description: "Experience the thrill of safari from the comfort of your tent",
//             price: 150.00,
//       },
//       {
//             ownerId: 8,
//             address: "99 Hero's Way",
//             city: "New York City",
//             state: "New York",
//             country: "United States of America",
//             lat: 40.7128,
//             lng: 74.0060,
//             name: "Superhero Lair",
//             description: "Unleash your inner superhero in this themed rental with a batcave play area",
//             price: 200.00,
//       },
//       {
//             ownerId: 6,
//             address: "543 Oak Tree Lane",
//             city: "Aspen",
//             state: "Colorado",
//             country: "United States of America",
//             lat: 39.1911,
//             lng: 106.8175,
//             name: "Treehouse Retreat",
//             description: "Relax in luxury with a treehouse-themed bedroom and a zip line",
//             price: 500.00,
//       },
//       {
//             ownerId: 5,
//             address: "123 Magic Lane",
//             city: "Orlando",
//             state: "Florida",
//             country: "United States of America",
//             lat: 28.5383,
//             lng: -81.3792,
//             name: "Tropical Paradise",
//             description: "A tropical-themed rental with a pool and a tiki hut play area.",
//             price: 350.00,
//       },
//       {
//             ownerId: 8,
//             address: "321 Wizard Way",
//             city: "Seattle",
//             state: "Washington",
//             country: "United States of America",
//             lat: 47.6062,
//             lng: -122.3321,
//             name: "Wizards' Den",
//             description:
//                   "A wizard-themed rental with a magic wand-making station and a Hogwarts-themed bedroom.",
//             price: 250.00,
//       },
//       {
//             ownerId: 9,
//             address: "555 Hammer Lane",
//             city: "Austin",
//             state: "Texas",
//             country: "United States of America",
//             lat: 30.2672,
//             lng: -97.7431,
//             name: "Construction Zone",
//             description:
//                   "A construction-themed rental with a hard hat dress-up area and a Bob the Builder play area.",
//             price: 150.00,
//       },
//       {
//             ownerId: 7,
//             address: "789 Ocean Avenue",
//             city: "Los Angeles",
//             state: "California",
//             country: "United States of America",
//             lat: 34.0522,
//             lng: -118.2437,
//             name: "Mermaid's Cove",
//             description:
//                   "A mermaid-themed rental with a mermaid tail-making workshop and a coral reef play area.",
//             price: 500.00,
//       },
//       {
//             ownerId: 6,
//             address: "321 Interstellar Way",
//             city: "Denver",
//             state: "Colorado",
//             country: "United States of America",
//             lat: 39.7392,
//             lng: -104.9903,
//             name: "Outer Space Oasis",
//             description:
//                   "A space-themed rental with a planetarium and a spaceship play area.",
//             price: 200.00,
//       }
// ]





// [
//       {
//             spotId: 1,
//             ownerId: 1,
//       },
// {
//       spotId:2,
//             ownerId: 3,
//       },
// {
//       spotId:3,
//             ownerId: 2,
//       },
// {
//       spotId:4,
//             ownerId: 2,
//       },
// {
//       spotId:5,
//             ownerId: 6,
//       },
// {
//       spotId:6,
//             ownerId: 4,
//       },
// {
//       spotId:7,
//             ownerId: 7,
//       },
// {
//       spotId:8,
//             ownerId: 1,
//       },
// {
//       spotId: 9,
//             ownerId: 9,
//       },
// {
//       spotId: 10,
//             ownerId: 6,
//       },
// {
//       spotId: 11,
//             ownerId: 7,
//       },
// {
//       spotId:12,
//             ownerId: 10,
//       },
// {
//       spotId: 13,
//             ownerId: 8,
//       },
// {
//       spotId: 14,
//             ownerId: 6,
//       },
// {
//       spotId: 15,
//             ownerId: 5,
//       },
// {
//       spotId: 16,
//             ownerId: 8,
//       },
// {
//       spotId:17,
//             ownerId: 9,
//       },
// {
//       spotId:18,
//             ownerId: 7,
//       },
// {
//       spotId:19,
//             ownerId: 6,
//       }
// ]
