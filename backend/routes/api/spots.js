const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require( "sequelize" );
const { Spot, Review, SpotImage, User, sequelize } = require("../../db/models");

const router = express.Router();


router.get( "/", async ( req, res ) => {
      const Spots = await Spot.findAll({ //using default scope
        group: ["Spot.id"], //one row per spot in the result set
        // we only get 1 result without this group specification- bc of coalesce?
      } );
  res.json({ Spots });
});

module.exports = router;
