const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, err => {
    if (err) return console.error(err);
    console.log(`Server started listening at port ${PORT}`);
});