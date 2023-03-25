const note = require("../Models/notes");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;
        await note.create({
            user: req.user,
            title,
            description
        })
        return res.status(200).json({
            status: 200
        })
    }
    catch (err) {
        return res.json({
            message:"All data required"
        })
    }
});

app.get("/", async (req, res) => {
    const data = await note.find({ user: req.user });
    return res.json({
        data
    })
})

module.exports = app;
