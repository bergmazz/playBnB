const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require( "sequelize" );
const { Spot, Review, SpotImage, User, sequelize } = require("../../db/models");

const router = express.Router();


router.get("/", async (req, res) => {

      const Spots = await Spot.findAll({
        attributes: {
          include: [
            [
              sequelize.fn(
                "COALESCE", //returns the first non-null value in a list
                sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                sequelize.literal("'no ratings just yet'")
              ), //If no reviews for a spot,  return message as a default value
              "avgRating",
            ],
            [
              sequelize.fn(
                "COALESCE",
                sequelize.col("SpotImages.url"),
                sequelize.literal("'image preview unavailable'")
              ),
              "previewImage",
            ],
          ],
        },
        include: [
          { //gotta include the models in order for fn to recognize the columns
            model: Review,
            required: false,
            attributes: [],
          },
          {
            model: SpotImage,
            required: false,
            where: { preview: true },
            attributes: [],
          },
        ],
        group: ["Spot.id"], //one row per spot in the result set
        //only get 1 result without this group specification- bc of coalesce?
      });
  res.json({ Spots });
});

module.exports = router;
