require("dotenv").config({ path: "./.env" });
const express = require("express");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());

app.get("*", (req, res) => {
    res.send("Runinng..")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
