const router = require("express").Router();
const Product = require("../models/product");

const upload = require("../middlewares/upload-photo");

// Post Request  -  Create a new Product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;
    product.rating = req.body.rating;
    product.price = req.body.price;
    product.owner = req.body.ownerID;
    product.category = req.body.categoryID;

    await product.save();
    res.json({
      status: true,
      message: "Successfuly Save...!",
    });
  } catch (err) {
    res.status.json({
      status: false,
      message: err.message,
    });
  }
});

// GET Request | All Products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("owner category")
      .populate("reviews", "rating")
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

// GET Request Single Product

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("owner category")
      .populate("reviews", "rating")
      .exec();
    res.json({
      status: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

// Put Request - Edit a Product

// router.put("/products/:id", async(req, res) => {
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          photo: req.file.location,
          owner: req.body.ownerID,
          category: req.body.categoryID,
          stockQuantity: req.body.stockQuantity,
          description: req.body.description,
        },
      },
      {
        upsert: true,
      }
    );

    res.json({
      status: true,
      updatedProduct: product,
    });
  } catch (err) {
    res.status.json({
      status: false,
      message: err.message,
    });
  }
});

// Delete Request Product

router.delete("/products/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });

    if (deleteProduct) {
      res.json({
        status: true,
        message: "Deleted Successfuly...!",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
