//Back end deployment of my API

//Enable dependencies 
const PORT  = 3000;
const express = require("express");
const app = express();
const pg = require("pg");
const cors = require("cors");

//***lOOK INTO PG.POOL INSTEAD OF CLIENT FOR MORE THQAN 1 CLIENT AFTER DAY 1 MVP***//
const {Client} = pg;
const client = new Client({
    connectionString:"postgresql://postgres:docker@localhost:5432/taskermvp"
});

client.connect();
//need cors to run the API
app.use(cors());
//express.json() is an Express middleware function that parses incoming JSON
//requests and puts the parsed data in req.body
app.use(express.json());

///////////Create the CRUD; For Day 1 10/10/2022 READ is the MVP per David's instructions//////////////

//test for READ
app.get('/', (req,res) => {
    res.send("hi world");
});

app.get("/tasker/who/", (req, res) => {
    client.query('SELECT * FROM who')
    .then(result => {
        res.send(result.rows);
        res.status(200);
    })
    .catch(err => {
        console.log(err);
    })
});
//////////////////////////////////////////////////////////////////////////////////////////////////////

//binds and listen the connections on the port specified
app.listen(PORT, (req, res) => {
    console.log("Postgres server listening on ", PORT);
})