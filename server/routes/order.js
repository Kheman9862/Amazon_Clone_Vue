const router = require("express").Router();
const Order = require("../models/order");
const verifyToken = require("../middlewares/verify-token");

// GET Request Orders
router.get("/orders", verifyToken, async (req, res) => {
  try {
    const products = await Order.find({ owner: req.decoded._id })
      .deepPopulate("owner products.productID.owner")
      .exec();
    res.json({
      status: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
