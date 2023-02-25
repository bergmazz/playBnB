const express = require("express");

const { setTokenCookie, requireAuth, isOwner } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require( "sequelize" );
const { Spot, Review, ReviewImage, Booking, SpotImage, User, sequelize } = require("../../db/models");

const router = express.Router();

//get current user spots
router.get( "/current", requireAuth, async ( req, res ) => {
      //  let owner = User.findByPk(req.user.id)
      // let Spots = owner.getOwnedSpots();
      const Spots = await Spot.findAll({ //default scope
        where: {ownerId: req.user.id, },
      //   group: ["Spot.id", "SpotImages.url"],
      });
 return res.json({ Spots });
} );


// Get all Reviews by a Spot's id

router.get('/:id/reviews', async(req,res)=>{

let spot = await Spot.findByPk( req.params.id )
//  console.log(spot.id)
          if (spot) {
               const reviews = await Review.scope(["defaultScope","perSpot"]).findAll({
                 where: { spotId: req.params.id },
               });
            return  res.json({ reviews });
          } else {
              return  res.status(404).json({
                    message: "Spot couldn't be found",
                    statusCode: 404,
                  });
      }
})

//  Get all Bookings for a Spot based on the Spot's id
router.get( "/:id/bookings", requireAuth, async ( req, res ) => {
      let spot = await Spot.findByPk( req.params.id )

      if ( !spot ) {
           return  res.status(404).json({
                    message: "Spot couldn't be found",
                    statusCode: 404,
                  });
      }
      let bookings;
      if ( spot.ownerId === req.user.id ) {
            //  bookings = await Booking.scope("justDateNoSeconds").findAll({
               bookings = await Booking.findAll({
                where: { spotId: req.params.id },
                include: [
                  {  model: User.scope("forBooking")  },
                ],
              });
      } else {
                bookings = await Booking.scope("notOwned").findAll({
                  where: { spotId: req.params.id },
                });
      }
    return  res.json({"Bookings": bookings})
})

//get spot details by spot id
router.get( "/:spotId", async ( req, res ) => {

      let thisSpot = await Spot.scope(["defaultScope", "allDetails"])
        .findOne({
          where: { id: req.params.spotId },
          group: ["Spot.id", "SpotImages.id", "Reviews.id", "Owner.id"],
        });

      if ( !thisSpot ) {
                     res.json({ // CHECK BACK maybe next(err) instead?
                       message: "Spot couldn't be found",
                       statusCode: 404,
                     });
      } else {
           res.json(thisSpot);
      }
} );

// get all spots
router.get( "/", async ( req, res ) => {
      const Spots = await Spot.findAll({ //using default scope
      //   group: ["Spot.id", "SpotImages.url"], //one row per spot in the result set
      } );
  return res.json({ Spots });
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

// add image to spot based on id
router.post("/:id/images", requireAuth, async (req, res) => {
      const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.id);
// console.log(spot)
      if ( !spot ) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  //authorization required //CHECK BACK refactor into dynamic function in auth.js?
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
    spotId: spot.id
  });
  spot.addSpotImages([image]);
  let imageDefaultScope = await SpotImage.scope(["defaultScope"]).findByPk(
    image.id
  );
  //CHECK BACK returning just image also included excluded attributes createdAt updatedAt
      // res.json( {
      //       id: image.id,
      //       url: image.url,
      //       preview: image.preview
      // } );
    return  res.json(imageDefaultScope)
  // res.json(image.scope()) totally made this up I guessss TypeError: image.scope is not a function
} );

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
//create review for spot based on spot id
router.post( "/:id/reviews", requireAuth, validateReview, async ( req, res ) => {
      const { review, stars } = req.body;

        const spot = await Spot.findByPk(req.params.id);
        // console.log(spot)
        if (!spot) {
       return   res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
          });
        }
        let alreadyReviewed = await Review.findAll({
          where: {
            [Op.and]: [{ userId: req.user.id }, { spotId: req.params.id }],
          },
        } );
      if (alreadyReviewed[0]) {
       return res.status(403).json({
            message: "User already has a review for this spot",
            statusCode: 403,
          });
      } else {
            let thisReview = await Review.create( {
                  userId: req.user.id,
                  spotId: spot.id,
                  review: review,
                  stars: stars,
            } )
        return  res.json( { thisReview  } )
      }
 })

//Create a Booking from a Spot based on the Spot's id

router.post( "/:id/bookings", requireAuth, async ( req, res ) => {
  let { startDate, endDate } = req.body;

  let spot = await Spot.findByPk(req.params.id);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  if (spot.ownerId === req.user.id) {
    return res.status(403).json({ message: "Forbidden", statusCode: 403 });
  }

  if (endDate <= startDate) {
   return  res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }

  if (startDate <= new Date().toISOString().slice(0, 10)) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "startDate cannot be in the past",
      },
    });
  }

  const existingBookings = await Booking.findAll({
    where: {spotId: req.params.id,},
  });

  const errors = {};
  if (existingBookings.length) {
    for (let booking of existingBookings) {
          if ( // start is in range or is an exisitng end or is an existing start
      ( startDate >= booking.startDate && startDate <= booking.endDate ) ||
        startDate === booking.startDate ||
        startDate === booking.endDate
      ) {
        errors.startDate = "Start date conflicts with an existing booking";
      }
      if (
           ( endDate >= booking.startDate && endDate <= booking.endDate) ||
       endDate === booking.startDate ||
        endDate === booking.endDate
      ) {
        errors.endDate = "End date conflicts with an existing booking";
      }
    }
  }

  if (Object.keys(errors).length) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: errors,
    });
  }

  const booking = await Booking.create({
    userId: req.user.id,
    spotId: req.params.id,
    startDate: new Date(req.body.startDate).toISOString().slice(0, 10),
    endDate: new Date(req.body.endDate).toISOString().slice(0, 10),
  });
  return res.json(booking);
} )

//create new spot
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


router.put("/:id", requireAuth, validateNewSpot, async (req, res) => {
  const { name, description, price, address, city, state, country, lat, lng } =
        req.body;

      let spot = await Spot.findByPk(req.params.id)

      if ( !spot ) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
      }

        if (spot.ownerId !== req.user.id) {
          return res.status(403).json({
            message: "Forbidden",
            statusCode: 403,
          });
        }

let freshSpot = await spot.update({
  address: address,
  city: city,
  state: state,
  country: country,
  lat: lat,
  lng: lng,
  name: name,
  description: description,
  price: price,
  updatedAt: sequelize.literal("CURRENT_TIMESTAMP"),
});
      freshSpot = await Spot.scope( "lessDetail" ).findByPk(req.params.id)
  res.json(freshSpot);
});


router.delete( "/:id", requireAuth, async ( req, res ) => {

      let spot = await Spot.findByPk(req.params.id)
      if ( !spot ) {
            return res.status( 404 ).json( {
                  message: "Spot couldn't be found",
                  statusCode: 404,
            } );
      } else  if ( spot.ownerId !== req.user.id ) {
            return res.status( 403 ).json( {
                  message: "Forbidden",
                  statusCode: 403,
            } );
      } else {
await spot.destroy();
           return  res.json({
              message: "Successfully deleted",
              statusCode: 200,
            });
      }
})


module.exports = router;
