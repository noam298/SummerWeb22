const express = require('express');
const BodyParser = require('body-parser');
const path = require('path');
const port = 8080;
const sql = require('./db');
const CRUD = require('./CRUD');
const CreateDB=require('./DBCreateData');

//SetUp
const app = express();


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('static'));  

const start=function(req,res){
    res.render('homePage');
};

app.get('/',[CreateDB.DropUsersTable,CreateDB.CreateUsers, CreateDB.InsertDataToUsers,start]);

app.get('/signIn', (req,res)=>{
    res.render('homePage');
})

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

app.get("/homePage", (req, res) => {
    res.render("welcomePage");
});


app.listen(port, ()=>{
    console.log("server is running on port " + port);
});