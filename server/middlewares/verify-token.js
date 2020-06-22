const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // whenever someone make a request, we can attatch something to the headers
  let checkBearer = "Bearer ";

  if (token) {
    if (token.startsWith(checkBearer)) {
      token = token.slice(checkBearer.length, token.length);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      // .veryify is to verify the token, you pass in the token and the secret key
      if (err) {
        res.json({
          success: false,
          message: "Failed to authenticate",
        });
      } else {
        req.decoded = decoded; // decoded is the user object
        next();
      }
    });
  } else {
    res.json({
      success: false,
      message: "No Token Provided",
    });
  }
};
