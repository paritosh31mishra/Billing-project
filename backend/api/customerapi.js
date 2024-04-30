const express = require("express");
const router = express.Router();
module.exports = router;

let Customer = require("../schema/customerschema");
const Myadmin = require("../schema/adminschema");

router.get("/:tokenno", async(req,res)=>{
    let admin = await Myadmin.findById(req.params.tokenno);
    if(admin == null){
        res.status(201).json({"message":"Invalid Token No"});
    }
    else{
       let userlist = await Customer.find();
       res.status(201).json(userlist);
    }
 
});

router.put("/:customerid", async(req,res)=>{
    let id = req.params.customerid;
    let customerinfo = await Customer.findById(id);
    if(customerinfo == null){
        res.status(201).json({"message": "No matching Record in Database !"});
    }
    else{
        res.status(201).json(customerinfo);
    }
 
});

router.post("/", async(req,res)=>{
   let token = req.body.tokenno;
    let admin = await Myadmin.findById(token);
    if(admin == null)
    {
        res.status(201).json({"message": "Invalid token no.", "error": "YES"});
    }
    else{
        let newCustomer = new Customer({
            "name": req.body.fullname,
            "email": req.body.emailid,
            "mobile": req.body.mobileno,
            "city":  req.body.cityname,
            "pincode": req.body.zipcode,
            "address": req.body.fulladdress
        });
        let info = await newCustomer.save();
        res.status(201).json({"message": "Record Save Successfully", "error": "NO"});
    }
   
})

