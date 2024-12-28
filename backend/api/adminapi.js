const express = require("express");
const router = express.Router();
module.exports = router;

const Myadmin = require("../schema/adminschema");

router.post("/", async (req,res)=>{
   let input = {"email": req.body.email, "password":req.body.password}

   let userinfo = await Myadmin.findOne( input );
   if( userinfo == null)
   {
    let info = {fullname:"", status:"FAIL", token:""};
     res.status(201).json(info);
   } else{
        let info = {fullname: userinfo.fullname, status: "SUCCESS", token:userinfo._id, role: userinfo.myrole};
        res.status(201).json(info);
   }

});

// create new account
router.put("/", async(req, res) =>{
   let newuser = new Myadmin({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      myrole: req.body.role
   })

   let userinfo = await newuser.save();
   res.status(201).json(userinfo);
});

//here we are using put to post data , we can use delete, get for it, but name should be same in method section and api page ("PUT" and router.put) but
//appropiate method should be used not anything

