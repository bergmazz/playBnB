const express = require( "express" );

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require( "../../db/models" );

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

      if ( !user ) {
       return  res.status(401).json({
          message: "Invalid credentials",
          statusCode: 401,
        });
  }
  await setTokenCookie(res, user);
//isaiahs suggestion
// const {id, username, email, firstName, lastName, createdAt, updatedAt} = user;
// return res. json (h
// user: {id, firstName, lastName, email, username, createdAt, updatedAt}
// next ();
      return res.json( {
        user: user.toSafeObject()
  });
});

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Get current User // Restore session user
router.get(
  '/',
  restoreUser, requireAuth,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({ user: null });
  }
);


module.exports = router;
