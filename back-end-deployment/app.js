//Back end deployment of my API

//Enable dependencies 
const PORT  = 3000;
const express = require("express");
const app = express();
const pg = require("pg");
const cors = require("cors");
const { response } = require("express");

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

app.get("/tasker/tasks/", (req, res) => {
    client.query('SELECT * FROM tasks_to_do')
    .then(response => {
        res.send(response.rows);
        res.status(200);
    })
    .catch(err => {
        console.log(err);
    })
});

app.get("/tasker/tasks/:id", (req, res) => {
    let { id } = req.params;
    client.query(`SELECT * FROM tasks_to_do WHERE task_id= $1`, [id])
    .then(response => {
        res.send(response.rows);
        res.status(200);
    })
    .catch(err => {
        console.log(err);
    })
});
//delete
app.get("/tasker/tasks/delete/:id", (req, res) => {
    let { id } = req.params;
    client.query(`DELETE FROM tasks_to_do WHERE task_id= $1`, [id])
    .then(response => {
        res.send(response.rows);
        res.status(200);
    })
    .catch(err => {
        console.log(err);
    })
});

app.post("/tasker/tasks/", (req, res) => {
    let {who, phone_number, email, what, when_at, time_at, where_at, extra_info} = req.body
    client.query(`INSERT INTO tasks_to_do (who, phone_number, email, what, when_at, time_at, where_at, extra_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [who, phone_number, email, what, when_at, time_at, where_at, extra_info])
    console.log(req.body)
    .then(response => {
        response.send('New task posted').status(200)
    })
    .catch(error => {
        console.log(error);
        res.status(404);
    })
})


app.patch("/tasker/tasks/:id", (req, res) => {
    const{ id } = req.params;
    let {who, phone_number, email, what, when_at, time_at, where_at, extra_info} = req.body
    client.query(`UPDATE tasks_to_do SET who = '${who}', SET phone_number = '${phone_number}', SET email = '${email}', SET what = '${what}', 
    SET when_at = '${when_at}', SET where_at = '${where_at}', SET extra_info = '${extra_info}' WHERE task_id = ${id};`)
        .then(result => {
            res.status(200);
            res.send(`SUCCESS: Updated row ${id}`);
        })
        .catch(err => {
            console.log(err);
            res.status(404);
        })
});



app.delete("/tasker/tasks/:id", (req, res) => {
    let { id } = req.params;
    client.query(`DELETE FROM tasks_to_do WHERE task_id= $1`, [id])
    .then(response => {
        res.send(response.rows);
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