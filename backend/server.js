const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

const User = mongoose.model("User", {
  name: String,
  email: String,
  age: Number
});

// API
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add user (dynamic)
app.post("/api/users", async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Delete User
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User Deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(5000, "0.0.0.0", () => {
  console.log("Server running");
});