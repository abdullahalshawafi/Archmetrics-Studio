const express = require('express');
const dotenv = require('dotenv');

const db = require('./configs/mongo');

const app = express();

const PORT = process.env.PORT || 8080;

dotenv.config();

db().catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/contact-us", require("./routes/contactUs"));

app.listen(PORT, err => {
    if (err) return console.error(err);
    console.log(`Server started listening at port ${PORT}`);
});