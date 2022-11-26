const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let winkelmandItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gerecht",
    },
    hoeveelheid: {
        type: Number,
        required: true,
        min: [1, 'Hoeveelheid kan niet minder dan 1 zijn.']
    },
    prijs: {
        type: Number,
        required: true
    },
    totaal: {
        type: Number,
        required: true,
    }
})


winkelmandItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/winkelmandItem/${this._id}`;
});


module.exports = mongoose.model("WinkelmandItem", winkelmandItemSchema);