const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const path = require('path');
const dotenv = require('dotenv');

const db = require('./configs/mongo');

const app = express();

let PORT = process.env.PORT || 80;

dotenv.config();

db().catch(err => console.log(err));

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/api/contact-us", require("./routes/contactUs"));
app.use("/api/service", require("./routes/service"));
app.use("/api/project", require("./routes/project"));
app.use("/api/user", require("./routes/user"));
app.use("/api/image", require("./routes/image"));

if (process.env.NODE_ENV === "production") {
    PORT = 80;
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

app.listen(PORT, err => {
    if (err) return console.error(err);
    console.log(`Server started listening at port ${PORT}`);
});
