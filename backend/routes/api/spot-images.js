const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Booking,
  User,
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

router.delete("/:id", requireAuth, async (req, res) => {
      const image = await SpotImage.findByPk( req.params.id, { include: Spot.scope( "lessDetail" ) } );

  if (!image) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
      statusCode: 404,
    });
  }
  if (image.Spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
      await image.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});
module.exports = router;
