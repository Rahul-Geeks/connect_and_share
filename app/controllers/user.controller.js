const mongoose = require("mongoose");

let UserProfile = mongoose.model("UserProfile");

module.exports.getOneUser = (req, res, next) => {
    let body = req.body;
    console.log(body);
    UserProfile
        .findOne({ "userId": body.userId }, (error, user) => {
            if (error) {
                console.log("Error while searching a user");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a user",
                        "error": error
                    });
            } else if (!user) {
                console.log("No User Profile Present with given userId");
                res
                    .status(200)
                    .send({
                        "auth": false,
                        "message": "No User Profile Present with given userId"
                    });
            } else {
                console.log("User Profile Found Successfully");
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "User Profile Found Successfully",
                        "user": user
                    });
            }
        });
}

module.exports.getOneUserId = (req, res, next) => {
    let userName = req.body.userName;
    UserProfile
        .findOne({ "userName": userName }, "userId -_id", (error, userId) => {
            if (error) {
                console.log("Error while searching a user profile");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a user profile",
                        "error": error
                    });
            } else {
                console.log("User Id is: ");
                console.log(userId);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "User Profile searched Successfully",
                        "userId": userId.userId
                    });
            }
        });
}

module.exports.deleteOneUser = (req, res, next) => {
    let body = req.body;
    UserProfile
        .findOneAndDelete({ "userId": body.userId }, (error, response) => {
            if (error) {
                console.log("Error while deleting a user profile");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while deleting a user profile",
                        "error": error
                    });
            } else {
                console.log("User Profile deleted Successfully");
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "User Profile deleted Successfully",
                    });
            }
        });
}