//serves up the static page to the user

const express = require("express");
const app = express();

//const cors = require("cors");
//app.use(cors());

app.use(express.static('public-static-serve'));

app.listen(3001, () => {
    console.log("Listening on Port 3001");
});




