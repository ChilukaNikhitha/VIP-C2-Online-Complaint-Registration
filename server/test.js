const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://complaintUser:Complaint12345@cluster0.pmlarxu.mongodb.net/?appName=Cluster0")
  .then(() => {
    console.log("CONNECTED SUCCESSFULLY");
    process.exit(0);
  })
  .catch((err) => {
    console.error("FAILED:");
    console.error(err);
    process.exit(1);
  });