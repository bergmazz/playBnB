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

module.exports = router;
