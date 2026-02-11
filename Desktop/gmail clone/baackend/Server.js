const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./routes/singup/Signup");
const Inbox = require("./routes/inbox/Inbox");

const app = express();
app.use(express.json());
app.use(cors());

// DB
mongoose.connect("mongodb://localhost:27017/email")
  .then(() => console.log("mongodb is connected"))
  .catch(() => console.log("db error"));


// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isuserexist = await User.findOne({ email });
    if (isuserexist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const haspassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: haspassword
    });

    res.status(201).json({ message: "user successfully saved" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isuserexist = await User.findOne({ email });
    if (!isuserexist) {
      return res.status(400).json({ message: "user details dont exist" });
    }

    const comparepass = await bcrypt.compare(password, isuserexist.password);
    if (!comparepass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: isuserexist._id, email: isuserexist.email },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ================= EMAIL INBOX =================
app.post("/emailinbox", async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Inbox.create({ email, subject, message });

    res.status(201).json({ message: "message sent" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// GET all messages
app.get("/emailinbox", async (req, res) => {
  try {
    const messages = await Inbox.find(); 
    res.status(200).json(messages); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(5000, () => {
  console.log("server is running on port 5000");
});
