const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "enter_your_password",
    database: "todo1"
})

app.post('/signup', (req, res)=>{
    const q = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
       req.body.name, 
       req.body.email, 
       req.body.password
    ]
    db.query(q, [values], (err, data)=>{
        if(err){
            return res.json("Error occured");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res)=>{
    const q = "SELECT * FROM login where `email` = ? AND `password` = ?";

    db.query(q, [req.body.email, req.body.password], (err, data)=>{
        if(err){
            return res.json("Error occured");
        }
        if(data.length > 0)
        {
            return res.json(data);
        }
        else{
            return res.json("Failed");
        }
    })
})

// app.get('/create/table', (req, res) => {
//     let q = 'CREATE TABLE todolist1(id int AUTO_INCREMENT, firstName VARCHAR(255), lastName VARCHAR(255), PRIMARY KEY(id))';
//     db.query(q, (err, result) => {
//         if (err) throw err;
//         return res.status(201).json("TABLE CREATED");
//     });
// });

app.post('/create/list', (req, res) => {
    const q = "INSERT INTO todolist1 (`email`, `Task`, `Date`) VALUES (?)";

    const values = [
        req.body.email, 
        req.body.Task, 
        req.body.Date
     ]

    db.query(q, [values], (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
});


app.get('/show/todos/:email', (req, res) => {
    const email = req.params.email;
    const q = "SELECT * FROM todolist1 WHERE email = ?";

    db.query(q, [email], (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
});


app.get('/todo/:id', (req, res) => {
    const q = `SELECT * FROM todolist1 where id=${req.params.id}`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result[0]);
    });
});

app.put('/update/todo/:id', (req, res) => {
    const { email ,Task, Date } = req.body;
    // const q = `UPDATE todolist1 SET Task =${Task} Date =${Date} email =${email} where id=${req.params.id}`;
    const q = `UPDATE todolist1 SET ? where id=${req.params.id}`;

    db.query(q, { email, Task, Date }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
});


app.delete('/delete/todo/:id',  (req, res) => {

    const q = `DELETE FROM todolist1  WHERE id=${req.params.id}`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({ data: "todo deleted" });
    });
});


app.listen(9000, ()=>{
    console.log("Listening");
})
