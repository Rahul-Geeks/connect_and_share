const mongoose = require("mongoose");

let UserProfile = mongoose.model("UserProfile");

module.exports.getOneUser = (req, res, next) => {
    let body = req.body;
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