const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "https://task-1-vwzp.onrender.com",
};
require("dotenv").config();
const mongoose = require("mongoose");

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Mongoose DB has been connected");
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const User = require("./models/user");

app.post("/", async (req, res) => {
  try {
    const { user, password } = req.body;

    const isUser = await User.findOne({ user });
    console.log(isUser, "isuser");
    if (!isUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (isUser.password !== password) {
      condole.log(password, "password");
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user: isUser });
  } catch (error) {
    console.error("Error in POST /:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
