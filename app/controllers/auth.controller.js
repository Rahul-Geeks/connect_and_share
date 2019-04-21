const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let UserProfile = mongoose.model("UserProfile");
let UserCompany = mongoose.model("UserCompany");

let dateTime = require("../shared/date_time");
let CONFIG = require("../config");

module.exports.tokenValidator = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        console.log("No token provided");
        res
            .status(404)
            .send({
                "auth": false,
                "message": "No token provided"
            })
    } else {
        jwt.verify(token, CONFIG.SCRTKEY, (error, response) => {
            if (error) {
                console.log("Invalid Token");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Invalid Token",
                        "error": error
                    });
            } else {
                console.log("Valid Token");
                next();
            }
        });
    }
}

module.exports.addOneUser = (req, res, next) => {
    let body = req.body;

    const saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword = bcrypt.hashSync(body.password, salt);

    let newUserProfile = new UserProfile({
        "name": body.name,
        "userName": body.userName,
        "password": hashPassword,
        "phoneNo": body.phoneNo,
        "date": dateTime.getDateTime().date,
        "time": dateTime.getDateTime().time
    });

    newUserProfile
        .save((error, response) => {
            if (error) {
                if (error.errmsg.includes("duplicate")) {
                    console.log("User already exists with the given username");
                    console.log(error);
                    res
                        .status(404)
                        .send({
                            "auth": false,
                            "message": "User already exists with the given username",
                            "error": error
                        });
                } else {
                    console.log("Error while adding a user profile");
                    console.log(error);
                    res
                        .status(404)
                        .send({
                            "auth": false,
                            "message": "Error while adding a user profile",
                            "error": error
                        });
                }
            } else {
                console.log("User Profile added Successfully");
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "User Profile added Successfully",
                        "response": response
                    });
            }
        });
}

module.exports.userLogin = (req, res, next) => {
    let body = req.body;
    console.log(body);
    UserProfile
        .findOne({ "userName": body.userName }, (error, user) => {
            if (error) {
                console.log("Error while searching a user profile");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a user profile",
                        "error": error
                    });
            } else if (!user) {
                console.log("No User Present with the given user name");
                console.log(user);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "No User Present with the given user name"
                    });
            } else {
                console.log("User is present with the given user name");
                console.log(body.password + " and " + user.password);
                let isUserAuth = bcrypt.compareSync(body.password, user.password);
                if (isUserAuth) {
                    console.log("User authentication successfull");
                    let token = jwt.sign({ _id: user._id }, CONFIG.SCRTKEY);
                    res
                        .status(200)
                        .send({
                            "auth": true,
                            "message": "User Logged-in Successfully",
                            "token": token,
                            "userProfile": user
                        });
                } else {
                    console.log(isUserAuth);
                    console.log("Invalid Password !");
                    res
                        .status(404)
                        .send({
                            "auth": false,
                            "message": "Invalid Password !"
                        });
                }
            }
        });
}