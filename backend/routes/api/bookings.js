const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
      Booking, User,
  Spot,
  ReviewImage,
  Review,
  SpotImage,
  sequelize,
} = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const { application } = require("express");
const router = express.Router();


router.get("/current", requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Spot.scope("lessDetail"),
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
    ],
  });

      for ( let booking of bookings ) {

            // console.log(booking.dataValues.startDate);
    const previewPic = await SpotImage.findOne({
      where: { spotId: booking.Spot.id, preview: true },
    });
    if (previewPic) {
      booking.Spot.dataValues.previewImage = previewPic.url;
    } else {
     booking.Spot.dataValues.previewImage = "No Preview Image";
    }
  }
  res.json({ Bookings: bookings });
});

//see spots.js for Get all Bookings for a Spot based on the Spot's id



module.exports = router;
