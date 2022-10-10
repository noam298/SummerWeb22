const express = require('express');
const BodyParser = require('body-parser');
const path = require('path');
const port = 8080;
const sql = require('./db');
const CRUD = require('./CRUD');


//SetUp
const app = express();


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('static'));

app.get('/', (req, res)=>{
    
    res.render('homePage');
   // res.send("hi mysql + pug");
});

app.post('/insertUser',CRUD.InsertUser);

app.post('/NewEntry', CRUD.SearchUser);

app.get('/SelectAll', (req, res)=>{
    res.render('SelectAll');
});

app.post('/searchRes', CRUD.userSearchRes);

app.get('/ShowAllUsers', CRUD.ShowAllUsers);

app.get("/userCreation", (req, res) => {
    res.render("createAnAccount");
});

/*
app.get('/users', (req, res)=>{
    sql.query("SELECT * FROM users", (err, mysqlre)=>{
        if (err) {
            console.log("EEERRRROORRRR: ", err);
            res.status(404).send({message: "error in getting users"});
            return;
        }
        console.log("got all users");
        res.send(mysqlre);
        return;
    })});
*/
app.listen(port, ()=>{
    console.log("server is running on port " + port);
});