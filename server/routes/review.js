const router = require("express").Router();
const Review = require("../models/review");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verify-token");
const upload = require("../middlewares/upload-photo");

router.post(
  "/reviews/:productID",
  [verifyToken, upload.single("photo")],
  async (req, res) => {
    try {
      const review = new Review();
      review.headline = req.body.headline;
      review.body = req.body.body;
      review.rating = req.body.rating;
      review.photo = req.file.location;
      review.user = req.decoded._id;
      review.productID = req.params.productID;

      await Product.update({ $push: { reviews: review._id } });

      const saveReview = await review.save();

      if (saveReview) {
        res.json({
          status: true,
          message: "Successfuly Added Review ...!",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
  }
);

// GET Request | reviews on productID

router.get("/reviews/:productID", async (request, response) => {
  try {
    const productReviews = await Review.find({
      productID: request.params.productID,
    })
      .populate("user")
      .exec();
    response.json({
      status: true,
      reviews: productReviews,
    });
  } catch (err) {
    response.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
