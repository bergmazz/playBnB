const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  User, Spot, ReviewImage, Review, SpotImage, sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { application } = require("express");
const router = express.Router();

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  let reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
          {
                model: Spot.scope( "lessDetail" ),
                attributes: {
                            exclude:  ["description", "createdAt", "updatedAt"]
                 }
          },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  } );

  for (let review of reviews) {
    const previewPic = await SpotImage.findOne({
      where: { spotId: review.Spot.id, preview: true },
    });
    if (previewPic) {
      review.Spot.dataValues.previewImage = previewPic.url;
    } else {
      review.Spot.dataValues.previewImage = "No Preview Image";
    }
  }
  res.json({ Reviews: reviews });
});

// See spots.js for Get all Reviews by a Spot's id
// See spots.js for create reviewfor spot based on a a Spot's id

// Add an Image to a Review based on the Review's id
router.post( '/:id/images', requireAuth, async ( req, res ) => {
      let { url } = req.body;
      let review = await Review.findByPk( req.params.id )

    if(!review){
        return res.status(404).json({
            message:"Review couldn't be found",
            statusCode: 404
        })
      }

      if ( review.userId !== req.user.id ) {
            res.status( 403 ).json( {
                  message: "Forbidden",
                  statusCode: 403,
            } )
      }

      let numPics = await ReviewImage.count({where:{reviewId: review.id}})
   if(numPics >= 10){
     res.status(403).json({
        message:"Maximum number of images for this resource was reached",
        statusCode: 403
    })
   } else {
           let image = await ReviewImage.create( {
          url,
          reviewId: review.id,
        });
         review.addReviewImages( [ image ] );
         res.json(image)
   }


})



module.exports = router;
