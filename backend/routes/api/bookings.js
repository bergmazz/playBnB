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


router.get( "/current", requireAuth, async ( req, res ) => {
      const bookings = await Booking.findAll({
         //   const bookings = await Booking.scope("justDateNoSeconds").findAll({
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
  return res.json({ Bookings: bookings });
});

//see spots.js for Get all Bookings for a Spot based on the Spot's id
// see spots.js for Create a Booking from a Spot based on the Spot's id

 const validateBookingReq = [
    check('startDate').exists().notEmpty().isISO8601().withMessage("Start date is required"),
    check('endDate').exists().notEmpty().isISO8601().withMessage("End date is required"),
     handleValidationErrors
 ]

router.put( '/:id', requireAuth, validateBookingReq, async ( req, res ) => {
 let { startDate, endDate } = req.body;
      let bookingToUpdate = await Booking.findByPk( req.params.id )

      if ( !bookingToUpdate ) {
         return res.status(404).json({
           message: "Booking couldn't be found",
           statusCode: 404,
         });
       }

 if (bookingToUpdate.userId !== req.user.id) {
   return res.status(403).json({ message: "Forbidden", statusCode: 403 });
 }
 if (endDate <= startDate) {
   return res.json({
     message: "Validation error",
     statusCode: 400,
     errors: {
       endDate: "endDate cannot come before startDate",
     },
   });
 }

       if (bookingToUpdate.endDate < new Date().toISOString().slice(0, 10)) {
         return res.json({
           message: "Past bookings can't be modified",
           statusCode: 403,
         });
       }

 if (startDate <= new Date().toISOString().slice(0, 10)) {
   return res.json({
     message: "Validation error",
     statusCode: 400,
     errors: {
       startDate: "startDate cannot be in the past",
     },
   });
 }




 const existingBookings = await Booking.findAll({
   where: { spotId: bookingToUpdate.spotId },
 });

 const errors = {};
 if (existingBookings.length) {
   for (let booking of existingBookings) {
     if (
       // start is in range or is an exisitng end or is an existing start
       (startDate >= booking.startDate && startDate <= booking.endDate) ||
       startDate === booking.startDate ||
       startDate === booking.endDate
     ) {
       errors.startDate = "Start date conflicts with an existing booking";
     }
     if (
       (endDate >= booking.startDate && endDate <= booking.endDate) ||
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

  await bookingToUpdate.update({
   startDate: new Date(req.body.startDate).toISOString().slice(0, 10),
   endDate: new Date(req.body.endDate).toISOString().slice(0, 10),
  } );

 return res.json(bookingToUpdate);
 })


 router.delete("/:id", requireAuth, async (req, res) => {

   const booking = await Booking.findByPk(req.params.id);

   if (!booking) {
     return res.status(404).json({
       message: "Booking couldn't be found",
       statusCode: 404,
     });
   }
       const spot = await Spot.findByPk( booking.spotId );

   if (booking.userId !== req.user.id && spot.ownerId !== req.user.id) {
     return res.status(403).json({
       message: "Forbidden",
       statusCode: 403,
     });
   }
   if (booking.startDate <= new Date()) {
     return res.status(403).json({
       message: "Bookings that have been started can't be deleted",
       statusCode: 403,
     });
   }
   await booking.destroy();

   return res.status(200).json({
     message: "Successfully deleted",
     statusCode: 200,
   });
 });


module.exports = router;
