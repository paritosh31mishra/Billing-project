

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//require("dotenv").config();
const app = express();
// Update the CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://billing-project-1.onrender.com", // Hosted frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true, // Include credentials (if needed)
  })
);

app.use(express.json());
mongoose.connect("mongodb+srv://mishraparitosh31:pari31tosh@cluster0.nskf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
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

/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Update the CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://billing-project-1.onrender.com", // Hosted frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true, // Include credentials (if needed)
  })
);

app.use(express.json());

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
*/

/*
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://billing-project-1.onrender.com",
];

// Global CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
    credentials: true,
  })
);

// Additional middleware to ensure headers are applied
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight requests
  }
  next();
});

// JSON body parsing middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected..."))
  .catch((error) => console.error("Database connection failed:", error));

// Importing API routes
const admin = require("./api/adminapi");
app.use("/auth", admin);

const Customer = require("../backend/api/customerapi");
app.use("/customer", Customer);

const Product = require("../backend/api/productapi");
app.use("/product", Product);

const Bill = require("../backend/api/billapi");
app.use("/billing", Bill);

// Start server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`The server is live now on port ${PORT}...`));

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.disconnect();
  process.exit(0);
});
*/
