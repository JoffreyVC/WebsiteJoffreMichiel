const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WinkelMandSchema = new Schema({
  gerechten: [{type: mongoose.Schema.Types.ObjectId, ref: "WinkelmandItem"}],
  subTotaal: {
        default: 0,
        type: Number
  }
});


WinkelMandSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/winkelmand/${this._id}`;
});


module.exports = mongoose.model("WinkelMand", WinkelMandSchema);