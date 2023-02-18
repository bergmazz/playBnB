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
} );

router.get("/current", requireAuth, async (req, res) => {

      const Spots = await Spot.findAll({ //default scope
        where: {ownerId: req.user.id, },
        group: ["Spot.id"],
      });
  res.json({ Spots });
});


router.get( "/:spotId", async ( req, res ) => {
      let id = req.params.spotId
      let thisSpot = await Spot.scope( [ "defaultScope", "allDetails" ] ).findByPk( id );

      if ( thisSpot.id ) {
                  res.json(thisSpot);
      } else {
                  res.json({ // CHECK BACK maybe next(err) instead?
                    message: "Spot couldn't be found",
                    statusCode: 404,
                  });
      }
} );

   const validateNewSpot = [
     check("address")
       .exists({ checkFalsy: true })
       .notEmpty()
       .withMessage("Street address is required"),
     check("city")
       .exists({ checkFalsy: true })
       .notEmpty()
       .withMessage("City is required"),
     check("state")
       .exists({ checkFalsy: true })
       .notEmpty()
       .withMessage("State is required"),
     check("country")
       .exists({ checkFalsy: true })
       .notEmpty()
       .withMessage("Country is required"),
     check("lat")
       .isFloat({ min: -90, max: 90 })
       .withMessage("Latitude is not valid"),
     check("lng")
       .isFloat({ min: -180, max: 180 })
       .withMessage("Longitude is not valid"),
     check("name")
       .isLength({ max: 50 })
       .withMessage("Name must be less than 50 characters"),
     check("description")
       .exists({ checkFalsy: true })
       .notEmpty()
       .withMessage("Description is required"),
     check("price")
       .exists({ checkFalsy: true })
       .notEmpty()
       .withMessage("Price per day is required"),
     handleValidationErrors,
   ];


router.post("/", requireAuth, validateNewSpot, async (req, res) => {

      const {
        name,
        description,
        price,
        address,
        city,
        state,
        country,
        lat,
        lng,
      } = req.body;

      const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
            lng,
            name,
            description,
        price,
      });
  res.json(spot);
} );

router.post("/:id/images", requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spotId = req.params.id;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  //authorization required
  //only the spot owner can add an image
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
  const image = await SpotImage.create({
    url,
    preview,
  });
  spot.addSpotImages([image]);
  res.json(image);
});


module.exports = router;
