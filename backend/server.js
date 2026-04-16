const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection + Start Server
async function startServer() {
  try {
    console.log("Connecting to Mongo...");
    console.log("ENV CHECK:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected ✅");

    // Start server ONLY after DB connected
    app.listen(5000, "0.0.0.0", () => {
      console.log("Server running 🚀 on port 5000");
    });

  } catch (err) {
    console.log("Mongo Error ❌", err);
    process.exit(1); // stop app if DB fails
  }
}

startServer();

// ✅ Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// ✅ Routes

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add user
app.post("/api/users", async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Health check (very useful for Docker)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});