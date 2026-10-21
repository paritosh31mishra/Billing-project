const express = require("express");
const router = express.Router();
module.exports = router;
let Product = require("../schema/productschema");
let Myadmin = require("../schema/adminschema");

router.get("/", async(req,res)=>{
        let productlist = await Product.find({ qty: { $gt: 0 } });
        if(productlist == null){
            res.status(201).json({"message": "No Records in Database !"});
        }
        else{
            res.status(201).json(productlist);
        }
});

router.get("/:productid", async(req, res) =>{
    let id = req.params.productid;
    let productinfo = await Product.findById(id);
    if(productinfo == null){
        res.status(201).json({"message": "No matching Record in Database !"});
    }
    else{
        res.status(201).json(productinfo);
    }
})

router.post("/", async(req,res)=>{
   try {
    let token = req.body.tokenno;
    let admin = await Myadmin.findById(token);
    if(admin == null) {
        return res.status(401).json({"message": "Invalid token no.", "error": "YES"});
    } else {
        let newProduct = new Product({
            "name": req.body.pname,
            "price": req.body.pprice,
            "qty": req.body.pqty,
            "details":  req.body.pdetails
        });
        let info = await newProduct.save();
        res.status(201).json({"message": "Record Save Successfully", "error": "NO"});
    }
   } catch (error) {
       console.error("Product creation failed:", error);
       const message = error.name === "ValidationError"
           ? Object.values(error.errors).map((fieldError) => fieldError.message).join(" ")
           : "Could not save product. Please try again.";
       return res.status(400).json({"message": message, "error": "YES"});
   }
})

router.put("/:productid", async(req,res) =>{
    let id = req.params.productid;
    let productinfo = await Product.findById(id);
    if(productinfo == null){
        res.status(201).json({"message": "No matching Record in Database !", "error": "YES"});
    }
    else{
        productinfo.name = req.body.name;
        productinfo.price = req.body.price;
        productinfo.qty = req.body.qty;
        productinfo.details = req.body.details;
        let info = await productinfo.save();
        res.status(201).json({"message": "Record Updated Successfully", "error": "NO"});
    }
})

router.delete("/:productid", async(req, res) =>{
     let id = req.params.productid;
     let productinfo = await Product.findById(id);
     if( productinfo == null)
      res.status(201).json({"message": "Product not exist !!"});
    else{
        await Product.deleteOne(productinfo);
        res.status(201).json({"message": "Product deleted Successfully !!"});
    }
})
