
let mongoose = require("mongoose");
const  productStructure = new mongoose.Schema({
    name: {type:String, required:true},
    price : { type:Number, required: true },
    qty: {type:Number, required:true},
    details: {type: String, required:true}
});


module.exports = mongoose.model("Product", productStructure);