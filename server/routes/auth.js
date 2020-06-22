const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verify-token");

/* Signup Route */
router.post("/auth/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    // check if the body of the email or password is empty
    res.json({
      success: false,
      message: "Please provide an email and password",
    });
  } else {
    // create a new user object and save it to the DB
    try {
      let newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;

      await newUser.save(); // when we run the .save() it will go to the pre save function and then generate a hash and store it in the password

      let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800, // 1 week
      });

      res.json({
        success: true,
        token: token, // respond with the token
        message: "Successfully created a new user",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
});

/* Profile Route */
router.get("/auth/user", verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id }).populate(
      "address"
    );
    if (foundUser) {
      res.status(200).json({
        success: true,
        user: foundUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* Profile Update */
router.put("/auth/user", verifyToken, async (request, response) => {
  try {
    let foundUser = await User.findOne({ _id: request.decoded._id });
    if (foundUser) {
      if (request.body.name) foundUser.name = request.body.name;
      if (request.body.email) foundUser.email = request.body.email;
      if (request.body.password) foundUser.password = request.body.password;

      await foundUser.save();

      response.json({
        success: true,
        message: "Successfuly Update...!",
      });
    }
  } catch (err) {
    response.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

/* Login Route */
router.post("/auth/login", async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email }); // check if the email exists or not

    if (!foundUser) {
      res.status(403).json({
        success: false,
        message: "Authentication failed, User not found",
      });
    } else {
      if (foundUser.comparePassword(req.body.password)) {
        // if the user does exist, then we need to check the password
        let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
          expiresIn: 604800, // 1 week
        });

        res.json({
          // if it's the right password then we need to send the token
          success: true,
          token: token,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Authtication failed, wrong password",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
