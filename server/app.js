const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const db = require('./configs/mongo');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
dotenv.config();

db().catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/contact-us", require("./routes/contactUs"));
app.use("/project", require("./routes/project"));

app.listen(PORT, err => {
    if (err) return console.error(err);
    console.log(`Server started listening at port ${PORT}`);
});