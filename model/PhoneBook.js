const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PhoneBookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    // max: 255,
    // min: 6,
  },
});

module.exports = mongoose.model("User", PhoneBookSchema);
