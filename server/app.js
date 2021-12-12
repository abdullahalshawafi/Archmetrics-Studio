const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const fileupload = require("express-fileupload");
const db = require('./configs/mongo');

const app = express();

const PORT = process.env.PORT || 8080;
const DIRNAME = __dirname.replace('server', '').slice(0, -1);

app.use(cors());
dotenv.config();
app.use(fileupload());
db().catch(err => console.log(err));

app.use(express.static(path.join(DIRNAME, 'client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact-us", require("./routes/contactUs"));
app.use("/api/service", require("./routes/service"));
app.use("/api/project", require("./routes/project"));
app.use("/api/user", require("./routes/user"));
app.use("/image", require("./routes/image"));

if (process.env.NODE_ENV === "production") {
    app.get('*', (req, res) => {
        console.log(path.join(DIRNAME + '/client/build/index.html'));
        res.sendFile(path.join(DIRNAME + '/client/build/index.html'));
    });
}

app.listen(PORT, err => {
    if (err) return console.error(err);
    console.log(`Server started listening at port ${PORT}`);
});