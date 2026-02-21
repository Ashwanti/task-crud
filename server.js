const express = require("express");
const mongoose = require("mongoose")
const { config } = require("dotenv");
const taskRoutes = require("./Backend/routes/taskRoutes");
config();
const app = express();

mongoose.connect("mongodb://localhost:27017/taskdb")
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Greetings from task server");
});

app.use("/api/manage-tasks", taskRoutes);

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
