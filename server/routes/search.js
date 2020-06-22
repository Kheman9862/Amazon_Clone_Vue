const router = require("express").Router();
const algoliaSearch = require("algoliasearch");

const client = algoliaSearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SECRET_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX);

router.post("/search", async (req, res) => {
  try {
    let result = await index.search(req.body.title); //Try hitsPerPage
    res.json(result.hits);
  } catch (err) {
    res.status.json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
