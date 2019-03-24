const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let UserProfile = mongoose.model("UserProfile");
let UserCompany = mongoose.model("UserCompany");


module.exports.addOneUser = (req, res, next) => {
    let body = req.body;

    const saltRounds = 10;
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword = bcrypt.hashSync("body.password", salt);

    let newUserProfile = new UserProfile({
        "name": body.name,
        "userName": body.userName,
        "password": hashPassword,
        "phoneNo": body.phoneNo,
        "isCompany": body.isCompany
    });

    newUserProfile
        .save((error, response) => {
            if (error) {
                console.log("Error while adding a user profile");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while adding a user profile",
                        "error": error
                    });
            } else {
                console.log("User Profile added Successfully");
                console.log(response);
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