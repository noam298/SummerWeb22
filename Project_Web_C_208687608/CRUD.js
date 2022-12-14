const sql = require('./db');
const InsertUser = (req,res)=>{
    var vac="No";
    var neu="No";

    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    if(Boolean(req.body.DogsVacc)){
        vac="Yes";
    }
    if(Boolean(req.body.DogsNeu)){
        neu="Yes";
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
        "vacc" : vac,
        "neut" : neu,
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
        
        res.render('resultsPage', {
            pple: mysqlres
        });
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


    const Q3 = "SELECT * FROM users WHERE (email=? AND userPassword = ?)";
    sql.query(Q3, [uEmail,uPassword],(err, mysqlres)=>{
            if (err) {
                console.log("error in getting all users " + err);
                res.status(400).send({message:"error in getting all users " + err});
                return;
            }
            if (mysqlres.length == 0){
                const message1 = "One or more fields are incorrect.";
                const message2 = "Please try again.";
                res.render('fail', {failMessage1: message1, failMessage2: message2});
                return;
            }
            console.log("success... ");
            res.render('searchPage');
            return;
        });

};

const userSearchRes = (req,res)=>{
    var noFiltersTry = Boolean(req.body.all);
    console.log("no filterssssss:" + noFiltersTry);
    if (noFiltersTry) {
        console.log("im here without filters");
        const Q5 = "SELECT * FROM users";
        sql.query(Q5, (err, mysqlres)=>{
            if (err) {
                console.log("error in getting all users " + err);
                res.status(400).send({message:"error in getting all users " + err})
                return;
            }
            else{
            console.log("success... ");
            
            res.render('resultsPage', {
                pple: mysqlres
            });
            return;
            }
        });
        return;
        
    }


    var age = req.body.dogsAgeRange;
    var distance = req.body.DistanceRange;
    var sLatitude = req.body.searchLatitude;
    var sLongitude = req.body.searchLongitude;
    var vacci="No";
    var neut="No";

    if(Boolean(req.body.DogsVacci)){
        vacci="Yes";
    }
    if(Boolean(req.body.DogsNeut)){
        neut="Yes";
    }


    const Q4 = "SELECT * FROM users WHERE (dogsAge>=?) AND (vacc = ?) AND (neut=?) AND (SQRT(POW(69.1*(latitude - ?),2) + POW(69.1*(? - longitude)*COS(latitude/57.3),2))<?) ";
    sql.query(Q4, [age,vacci,neut,sLatitude,sLongitude,distance],(err, mysqlres)=>{
            if (err) {
                console.log("error in getting all users " + err);
                res.status(400).send({message:"error in getting all users " + err});
                return;
            }
            if (mysqlres.length == 0){
                const message1 = "There is no dogs that match your filters";
                const message2 = "Please try to expend the search";
                res.render('fail', {failMessage1: message1, failMessage2: message2});
                return;
            }
            console.log("success!!! ");
            res.render('resultsPage', {
                pple: mysqlres
            });
            return;
        });    
    };


module.exports = {InsertUser, ShowAllUsers,SearchUser, userSearchRes }