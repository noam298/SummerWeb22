var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

const CreateUsers = (req,res,next)=> {
    var Q1 = "CREATE TABLE users (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, email varchar(255) NOT NULL, userFname varchar(255) NOT NULL, userLname varchar(255) NOT NULL, phoneNum varchar(255) NOT NULL, dateOB date NOT NULL, userGender varchar(255) NOT NULL, dogsName varchar(255) NOT NULL, breed varchar(255) NOT NULL, dogsGender varchar(255) NOT NULL, dogsAge float NOT NULL, vacc VARCHAR(3), neut VARCHAR(3), userPassword varchar(255) NOT NULL, latitude float NOT NULL, longitude float NOT NULL)"
    
    console.log("users table creation");
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created users table');
        next();
    })      
};


const InsertDataToUsers = (req,res,next)=>{
    var Q3 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "usres.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    jsonObj.forEach(element => {
        var NewEntry = {
            "id": element.id,
            "email" : element.email,
            "userFname" : element.userFname,
            "userLname" : element.userLname,
            "phoneNum" : element.phoneNum,
            "dateOB" : element.dateOB,
            "userGender" : element.userGender,
            "dogsName" : element.dogsName,
            "breed" : element.breed,
            "dogsGender" : element.dogsGender,
            "dogsAge" : element.dogsAge,
            "vacc" : element.vacc,
            "neut" : element.neut,
            "userPassword" : element.userPassword,
            "latitude": element.latitude,
            "longitude": element.longitude
        }
        SQL.query(Q3, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
        });
    });
    })
    next();
};




const ShowUsersTable = (req,res,next)=>{
    var Q6 = "SELECT * FROM users";
    SQL.query(Q6, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing users table");
        next();
    })};

const DropUsersTable = (req, res, next)=>{
    var Q7 = "DROP TABLE users";
    SQL.query(Q7, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("users table drpped");
        next();
    })
}



module.exports = {
    CreateUsers,
    InsertDataToUsers,
    ShowUsersTable,
    DropUsersTable
 };