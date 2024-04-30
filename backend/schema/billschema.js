let mongoose = require("mongoose");
const  billStructure = new mongoose.Schema({
    name: {type:String, required:true},
    email : { type:String, required: true },
    mobile: {type:String, required:true},
    city: {type: String, required:true},
    pincode : { type:String, required:true},
    address: {type:String, required: true},
    product: {type:String, required: true},
    quantity: {type:Number, required: true},
    price: {type:Number, required: true},
    total: {type:Number, required: true}
});


module.exports = mongoose.model("Billing", billStructure);