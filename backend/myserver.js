//express downloading code
const express = require("express");
const app = express();

// use cross origin for frontend-backend communication
const cors = require("cors"); // calling cross origin library
app.use(cors()); // creating object of cors library
app.use(express.json());

//database connection code start
const mongoose = require("mongoose");// importing mongodb compiler
mongoose.connect("mongodb://127.0.0.1:27017/mernproject", {useNewUrlParser:true});
//passing the url of database 
// use ip address instead of domain name localhost:27017

const db = mongoose.connection; //connection to db
db.on("error", (error)=> console.log( error )); // if error than show error
db.on("open", ()=> console.log(" Database Connected... ")); // otherwise show Database Connected
// database connection code end


const admin = require("./api/adminapi");
app.use("/auth", admin); // http://localhost:9999/auth - post

const Customer = require("../backend/api/customerapi");
app.use("/customer", Customer);  // http://localhost:9999/customer- post

const Product = require("../backend/api/productapi");
app.use("/product", Product);   // http://localhost:9999/product - post

const Bill = require("../backend/api/billapi");
app.use("/billing", Bill);   // http://localhost:9999/bill - post

app.listen(9999, () => console.log("The server is live now...."));

