const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
const authRoutes = require("./routes/auth");
const complaintRoutes = require("./routes/complaint");

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});