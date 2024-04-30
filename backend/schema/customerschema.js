
let mongoose = require("mongoose");
const  customerStructure = new mongoose.Schema({
    name: {type:String, required:true},
    email : { type:String, required: true },
    mobile: {type:String, required:true},
    city: {type: String, required:true},
    pincode : { type:String, required:true},
    address: {type:String, required: true}
});


module.exports = mongoose.model("Customer", customerStructure);