/*//express downloading code
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

*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected..."))
  .catch((error) => console.error("Database connection failed:", error));

const admin = require("./api/adminapi");
app.use("/auth", admin);

const Customer = require("../backend/api/customerapi");
app.use("/customer", Customer);

const Product = require("../backend/api/productapi");
app.use("/product", Product);

const Bill = require("../backend/api/billapi");
app.use("/billing", Bill);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`The server is live now on port ${PORT}...`));

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.disconnect();
  process.exit(0);
});