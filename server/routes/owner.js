const router = require("express").Router();
const Owner = require("../models/owner");
const upload = require("../middlewares/upload-photo");

// POST - create new owner
router.post("/owners", upload.single("photo"), async (req, res) => {
  try {
    let owner = new Owner();

    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();

    res.status(200).json({
      success: true,
      message: "You have successfully added a new owner",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succes: false,
      message: err.message,
    });
  }
});

// GET - Get owner
router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      success: true,
      owners: owners,
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: err.message,
    });
  }
});

module.exports = router;
