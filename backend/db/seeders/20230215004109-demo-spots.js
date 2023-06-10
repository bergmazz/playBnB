"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Magic Lane",
          city: "Orlando",
          state: "Florida",
          country: "United States of America",
          lat: 28.5383,
          lng: -81.3792,
          name: "Enchanted Forest Cottage",
          description: "A magical treehouse with a slide and a fairy garden.",
          price: 350.0,
        },
        {
          ownerId: 3,
          address: "524 Beach Road",
          city: "Malibu",
          state: "California",
          country: "United States of America",
          lat: 34.0259,
          lng: -118.7798,
          name: "Beach Bungalow with a Twist",
          description:
            "A colorful beach house with a pirate ship play area and a mermaid-themed bedroom.",
          price: 550.0,
        },
        {
          ownerId: 2,
          address: "439 Safari Lane",
          city: "Austin",
          state: "Texas",
          country: "United States of America",
          lat: 30.2672,
          lng: -97.7431,
          name: "Jungle Safari Lodge",
          description:
            "A wildlife-themed lodge with a mini-zoo and a jungle-themed playroom.",
          price: 450.0,
        },
        {
          ownerId: 2,
          address: "720 Princess Street",
          city: "Savannah",
          state: "Georgia",
          country: "United States of America",
          lat: 32.0809,
          lng: -81.0912,
          name: "Princess Castle",
          description:
            "A castle with a princess-themed bedroom and a dress-up area.",
          price: 600.0,
        },
        {
          ownerId: 3,
          address: "80 Coral Reef Blvd",
          city: "Honolulu",
          state: "Hawaii",
          country: "United States of America",
          lat: 21.3069,
          lng: -157.8583,
          name: "Underwater Adventure",
          description:
            "An underwater-themed apartment with a submarine-shaped bed and a coral reef play area.",
          price: 250.0,
        },
        {
          ownerId: 2,
          address: "567 Space Avenue",
          city: "Houston",
          state: "Texas",
          country: "United States of America",
          lat: 29.7604,
          lng: -95.3698,
          name: "Space Station",
          description:
            "A space-themed rental with a rocket ship play area and a planetarium.",
          price: 400.0,
        },
        {
          ownerId: 1,
          address: "123 Rodeo Drive",
          city: "Bozeman",
          state: "Montana",
          country: "United States of America",
          lat: 45.677,
          lng: -111.0429,
          name: "Wild West Ranch",
          description:
            "A cowboy-themed ranch with a horse stable and a saloon play area.",
          price: 500.0,
        },
        {
          ownerId: 1,
          address: "890 Circus Lane",
          city: "Tampa",
          state: "Florida",
          country: "United States of America",
          lat: 27.9506,
          lng: -82.4572,
          name: "Circus Tent",
          description: "A circus-themed tent with a tightrope and a trapeze.",
          price: 150.0,
        },
        {
          ownerId: 2,
          address: "321 Dino Road",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          lat: 39.7392,
          lng: -104.9903,
          name: "Dinosaur Den",
          description:
            "A prehistoric-themed rental with a dinosaur fossil dig site and a T-Rex playhouse.",
          price: 300.0,
        },
        {
          ownerId: 3,
          address: "456 Fairy Tale Lane",
          city: "Portland",
          state: "Oregon",
          country: "United States of America",
          lat: 45.5231,
          lng: -122.6765,
          name: "Fairy Tale Cottage",
          description:
            "A storybook cottage with a Hansel and Gretel-themed bedroom and a gingerbread house play area.",
          price: 200.0,
        },
        {
          ownerId: 3,
          address: "456 King's Road",
          city: "Charleston",
          state: "South Carolina",
          country: "United States of America",
          lat: 32.7765,
          lng: 79.9311,
          name: "Medieval Castle",
          description:
            "Live like a knight in this castle with dragon's lair playhouse",
          price: 250.0,
        },
        {
          ownerId: 2,
          address: "101 Blackbeard's Way",
          city: "Tampa",
          state: "Florida",
          country: "United States of America",
          lat: 27.9506,
          lng: 82.4572,
          name: "Pirate's Cove",
          description:
            "Shiver me timbers! A pirate-themed rental with a ship-shaped bed",
          price: 175.0,
        },
        {
          ownerId: 1,
          address: "77 Safari Lane",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          lat: 39.7392,
          lng: 104.9903,
          name: "Safari Tent",
          description:
            "Experience the thrill of safari from the comfort of your tent",
          price: 150.0,
        },
        {
          ownerId: 2,
          address: "99 Hero's Way",
          city: "New York City",
          state: "New York",
          country: "United States of America",
          lat: 40.7128,
          lng: 74.006,
          name: "Superhero Lair",
          description:
            "Unleash your inner superhero in this themed rental with a batcave play area",
          price: 200.0,
        },
        {
          ownerId: 1,
          address: "543 Oak Tree Lane",
          city: "Aspen",
          state: "Colorado",
          country: "United States of America",
          lat: 39.1911,
          lng: 106.8175,
          name: "Treehouse Retreat",
          description:
            "Relax in luxury with a treehouse-themed bedroom and a zip line",
          price: 500.0,
        },
        {
          ownerId: 3,
          address: "123 Magic Lane",
          city: "Orlando",
          state: "Florida",
          country: "United States of America",
          lat: 28.5383,
          lng: -81.3792,
          name: "Tropical Paradise",
          description:
            "A tropical-themed rental with a pool and a tiki hut play area.",
          price: 350.0,
        },
        {
          ownerId: 2,
          address: "321 Wizard Way",
          city: "Seattle",
          state: "Washington",
          country: "United States of America",
          lat: 47.6062,
          lng: -122.3321,
          name: "Wizards' Den",
          description:
            "A wizard-themed rental with a magic wand-making station and a Hogwarts-themed bedroom.",
          price: 250.0,
        },
        {
          ownerId: 1,
          address: "555 Hammer Lane",
          city: "Austin",
          state: "Texas",
          country: "United States of America",
          lat: 30.2672,
          lng: -97.7431,
          name: "Construction Zone",
          description:
            "A construction-themed rental with a hard hat dress-up area and a Bob the Builder play area.",
          price: 150.0,
        },
        {
          ownerId: 3,
          address: "789 Ocean Avenue",
          city: "Los Angeles",
          state: "California",
          country: "United States of America",
          lat: 34.0522,
          lng: -118.2437,
          name: "Mermaid's Cove",
          description:
            "A mermaid-themed rental with a mermaid tail-making workshop and a coral reef play area.",
          price: 500.0,
        },
        {
          ownerId: 2,
          address: "321 Interstellar Way",
          city: "Denver",
          state: "Colorado",
          country: "United States of America",
          lat: 39.7392,
          lng: -104.9903,
          name: "Outer Space Oasis",
          description:
            "A space-themed rental with a planetarium and a spaceship play area.",
          price: 200.0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";

    await queryInterface.bulkDelete(options, null, {});
  },
};
