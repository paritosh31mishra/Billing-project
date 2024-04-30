const express = require("express");
const router = express.Router();
module.exports = router;

let Billing = require("../schema/billschema");

router.get("/", async (req, res) => {
  let billlist = await Billing.find();
  res.status(201).json(billlist);
});

router.post("/", async (req, res) => {
  let newbill = new Billing({
    name: req.body.fullname,
    email: req.body.email,
    mobile: req.body.mobile,
    city: req.body.city,
    pincode: req.body.pincode,
    address: req.body.address,
    product: req.body.product,
    quantity: req.body.quantity,
    price: req.body.price,
    total: req.body.total,
  });
  
  let info = await newbill.save();
  res.status(201).json({ message: "Record Save Successfully", error: "NO" });
});
