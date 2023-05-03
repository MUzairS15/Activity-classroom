const db = require('../database');
const AppError = require('../util/AppError');
const jwt = require('jsonwebtoken');

const registeredUsers = db.collection('registered-users');
const privateKey = "mynameisuzair";

const SignUp = async function(req, res, next){
  
    const {username, password, name} = req.body;

    // Check if user with provided username already exists
    const userEmail = await registeredUsers.where('username','==',username).get();
    if(userEmail.empty){
        const newUser = await registeredUsers.add({
            id: "",
            name: name,
            username: username,
            password: password
        })
        await newUser.update({id: newUser.id});
        const id = newUser.id;
        const auth_token = jwt.sign({id: id}, privateKey);

        res.status(200).json({auth_token}); //send auth-token when credentials are correct
    }else{
       next(new AppError("A user with this e-mail already exists.",403));
    }
}

const LogIn = async function(req, res, next){
    console.log("REACHED LOGIN");
    const userEmail = await registeredUsers.where('username','==',req.body.username).limit(1).get();
    if(userEmail.size === 0) {
        next(new AppError("Please register yourself", 403))
    }
    console.log("REACHED LOGIN 37");
    userEmail.forEach((doc) =>{
        console.log("REACHED LOGIN 39");
        if(!doc.exists){
                next(new AppError("Enter valid credentials", 401));
                console.log("REACHED LOGIN 42");
            }    
            else if(doc.data().password != req.body.password){
                console.log("REACHED LOGIN 45");
                next(new AppError("Enter valid credentials", 401));
            }else{
                console.log("REACHED LOGIN 48");
                const auth_token = jwt.sign({id: doc.data().id}, privateKey);
                res.json({"success":true,auth_token})
            }
    })
}

module.exports = { LogIn, SignUp }