const mongoose = require("mongoose");
const mongooseAlgolia = require("mongoose-algolia");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    owner: { type: Schema.Types.ObjectId, ref: "Owner" },
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

ProductSchema.virtual("averageRating").get(function () {
  if (this.reviews.length > 0) {
    let sum = this.reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0);

    return parseFloat((sum / this.reviews.length).toFixed(1));
  }

  return 0;
});

// ProductSchema.virtual("IndividualRating").get(function () {
//   let a = 0;
//   let b = 0;
//   let c = 0;
//   let d = 0;
//   let e = 0;

//   this.reviews.map((review) => {
//     if (review.rating === 5) {
//       a++;
//     }
//     if (review.rating === 4) {
//       b++;
//     }
//     if (review.rating === 3) {
//       c++;
//     }
//     if (review.rating === 2) {
//       d++;
//     }
//     if (review.rating === 1) {
//       e++;
//     }
//   });
//   let arr = [a, b, c, d, e];

//   return arr;
// });

// ProductSchema.virtual("TotalRating").get(function () {
//   let arr1 = this.IndividualRating;
//   let sum = 0;
//   for (let i = 0; i < 4; i++) {
//     sum += arr1.pop();
//   }

//   return sum;
// });

ProductSchema.plugin(mongooseAlgolia, {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_SECRET_KEY,
  indexName: process.env.ALGOLIA_INDEX, //The name of the index in Algolia, you can also pass in a function
  selector: "title _id photo description price rating averageRating owner", //You can decide which field that are getting synced to Algolia (same as selector in mongoose)
  populate: {
    path: "owner reviews",
  },

  debug: true, // Default: false -> If true operations are logged out in your console
});

let Model = mongoose.model("Product", ProductSchema);
Model.SyncToAlgolia(); //Clears the Algolia index for this schema and synchronizes all documents to Algolia (based on the settings defined in your plugin settings)
Model.SetAlgoliaSettings({
  searchableAttributes: ["title"], //Sets the settings for this schema,
});

module.exports = Model;
