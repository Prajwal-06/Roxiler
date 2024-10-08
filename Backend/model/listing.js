const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    sold:Boolean, 
    dateOfSale:Date
});
const Listing  = mongoose.model("Listing" , listingSchema);

module.exports = Listing;