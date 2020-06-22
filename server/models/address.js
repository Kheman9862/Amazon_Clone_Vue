const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  country: String,
  fullName: String,
  streetAdress: String,
  city: String,
  zipCode: Number,
  state: String,
  phoneNumber: String,
  deliverInstructions: String,
  securityCode: String,
});

module.exports = mongoose.model("Address", AddressSchema);
