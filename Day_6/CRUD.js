const sql = require('./db');
const InsertUser = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    const NewUserEntry = {
        "email" : req.body.UserEmail,
        "userFname" : req.body.UserFName,
        "userLname" : req.body.UserLName,
        "phoneNum" : req.body.UserPNum,
        "dateOB" : req.body.UserDOB,
        "userGender" : req.body.UserGender,
        "dogsName" : req.body.DogsName,
        "breed" : req.body.DogsBreed,
        "dogsGender" : req.body.DogsGender,
        "dogsAge" : req.body.DogsAge,
        "vacc" : Boolean(req.body.DogsVacc),
        "neut" : Boolean(req.body.DogsNeu),
        "userPassword" : req.body.UserPassword,
        "latitude": req.body.userLatitude,
        "longitude": req.body.userLongitude
    }
    const Q1 = "INSERT INTO users SET ?";
    sql.query(Q1, NewUserEntry, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error on creating user " + err});
            console.log("error om creating user " + err);
            return;            
        }
        console.log("created new user succesfully "+ mysqlres);
        res.render('homePage')
        // res.send({message:"created new  succesfully "+ mysqlres});
        return;
    });
};

const ShowAllUsers = (req,res)=>{
    const Q2 = "SELECT * FROM users";
    sql.query(Q2, (err, mysqlres)=>{
        if (err) {
            console.log("error in getting all users " + err);
            res.status(400).send({message:"error in getting all users " + err})
            return;
        }
        console.log("success... ");
        
        res.send(mysqlres);
        return;
    });
};

const SearchUser = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    const uEmail = req.body.UserEmail;
    const uPassword = req.body.UserPassword;
    // console.log(uEmail);
    // console.log(uPassword);

    const Q3 = "SELECT * FROM users WHERE (email=? AND userPassword = ?)";
    sql.query(Q3, [uEmail,uPassword],(err, mysqlres)=>{
            if (err) {
                console.log("error in getting all users " + err);
                res.status(400).send({message:"error in getting all users " + err});
                return;
            }
            if (mysqlres.length == 0){
                res.render('fail');
                return;
            }
            console.log("success... ");
            res.render('searchPage');
            return;
        });

};

const userSearchRes = (req,res)=>{
    var age = req.body.dogsAgeRange;
    var distance = req.body.DistanceRange;
    var vacci = Boolean(req.body.DogsVacci);
    var neut = Boolean(req.body.DogsNeut);

    if (!vacci) {
        vacci=0;
    }

    if (!neut) {
        neut=0;
    }

    const Q3 = "SELECT * FROM users WHERE (dogsAge>=? AND vacc = ? AND neut=?)";
    sql.query(Q3, [age,vacci,neut],(err, mysqlres)=>{
            if (err) {
                console.log("error in getting all users " + err);
                res.status(400).send({message:"error in getting all users " + err});
                return;
            }
            if (mysqlres.length == 0){
                res.render('fail');
                return;
            }
            console.log("success!!! ");
            res.render('resultsPage', {
                // var1:"All stuednt table",
                pple: mysqlres
            });
            // res.send(mysqlres);
            return;
        });

};

module.exports = {InsertUser, ShowAllUsers,SearchUser, userSearchRes }