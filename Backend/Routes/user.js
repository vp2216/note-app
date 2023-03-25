const user = require("../Models/user");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "NOTEAPP";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await user.findOne({ email });
    bcrypt.compare(password, userData.password, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Somethig went wrong please try again",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            user: userData._id,
          },
          secret,
          {
            expiresIn: "1hr",
          }
        );
        return res.status(200).json({
          status:200,
          message: "Login successfull",
          token,
        });
      }
      return res.status(400).json({
        message: "Password entered is wrong",
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: "User not registered",
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await user.findOne({ email });
    if (userData) {
      return res.status(409).json({
        message: "User already exists, please login",
      });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: "Somethig went wrong please try again",
        });
      }
      user.create({
        email,
        password: hash,
      });
      return res.status(200).json({
        status:200,
        message: "User successfully registerd",
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: "Please try again",
    });
  }
});

module.exports = app;
