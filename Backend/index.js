const express = require("express");
const cors = require("cors");
const db = require("mongoose");
const userRoute = require("./Routes/user");
const noteRoute = require("./Routes/notes");
const secret = "NOTEAPP";
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/notes", (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, secret, (err, decode) => {
            if (err) {
                return res.json({
                  message: "Token expired, please login again",
                });
            } 
            req.user = decode.user;
            next();
})
    } catch (err) {
        return res.json({
         err
        });
    }
})
app.use("/user",userRoute);
app.use("/notes",noteRoute);

db.connect("mongodb+srv://vp:vp@cluster0.qbyvryj.mongodb.net/notes");
app.listen(8060,console.log("Connected to server"))