const router = require("express").Router();
const sessionRouter = require("./session.js");
const spotsRouter = require("./spots.js");
const usersRouter = require("./users.js");
const reviewsRouter = require("./reviews.js");
const bookingsRouter = require("./bookings.js");
const spotImagesRouter = require("./spot-images");
const reviewImageRoute = require("./review-images");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/review-images", reviewImageRoute);

router.use("/spot-images", spotImagesRouter);

router.use("/bookings", bookingsRouter);

router.use("/reviews", reviewsRouter);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/spots", spotsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
