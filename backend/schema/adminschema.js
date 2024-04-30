let mongoose = require("mongoose");
const  adminStructure = new mongoose.Schema({
    fullname: {type:String, required:true},
    email : { type:String, required: true },
    password : { type:String, required:true},
    myrole: {type:String, required: true}
});


module.exports = mongoose.model("myadmin", adminStructure);
// import variable name in adminapi file should be myadmin (same as adminschema file)