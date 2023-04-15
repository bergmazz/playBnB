const express = require( "express" );

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require( "../../db/models" );
const { check } = require("express-validator");
const { handleValidationErrors } = require( "../../utils/validation" );
const {Op} = require('sequelize')

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more"),
  handleValidationErrors,
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;

        let existingEmail;
         let existingUserName;

      existingEmail = await User.findOne({ where: { email: email }} );
       existingUserName =  await User.findOne( { where: { username: username}} );

        let errors = {};

        if ( existingEmail ) errors[ "email" ] = "User with that email already exists";
      //   if ( !email.isEmail() ) errors[ "emailValid" ] = "Invalid email";
        if ( existingUserName ) errors[ "username" ] = "User with that username already exists";
      //   if ( !email.isEmail() ) errors[ "userNameValid" ] = "Invalid username";

        if ( existingEmail || existingUserName ) {
              return res.status( 403 ).json( {
                    message: "User already exists",
                    statusCode: 403,
                    errors
              } )
        }

    let user = await User.signup({ email, username, password, firstName, lastName});

    await setTokenCookie(res, user);
        //CHECK BACK may need to send token in response
        user = user.toSafeObject();
        user.token = ""
    return res.json({
      user
    });
  }
);

module.exports = router;
