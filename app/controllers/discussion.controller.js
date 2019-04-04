const mongoose = require("mongoose");

let Discussions = mongoose.model("Discussions");
let dateTime = require("../shared/date_time");

module.exports.addDiscussion = (req, res, next) => {
    let body = req.body;
    console.log(body);
    let newDiscussion = new Discussions({
        "topic": body.topic,
        "description": body.description,
        "companyId": body.companyId,
        "date": dateTime.getDateTime().date,
        "time": dateTime.getDateTime().time
    });
    newDiscussion
        .save((error, response) => {
            if (error) {
                console.log("Error while adding a discussion");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while adding a discussion",
                        "error": error
                    });
            } else {
                console.log("Added a discussion succesfully");
                console.log(response);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "Added a discussion succesfully",
                        "response": response
                    });
            }
        });
}

module.exports.getAllDiscussionsOneWorkSpace = (req, res, next) => {
    let body = req.body;
    Discussions
        .find({ "companyId": body.companyId })
        .exec((error, response) => {
            if (error) {
                console.log("Error while searching a Discussion");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a Discussion",
                        "error": error
                    });
            } else if (response.length === 0) {
                console.log("Discussion with the given User Name not found");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Discussion with the given User Name not found",
                    });
            } else {
                console.log(response);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "Discussions For the given user Found",
                        "response": response
                    });
            }
        });
}

module.exports.addOneView = (req, res, next) => {
    let body = req.body;
    let updateDiscussion = {
        "$set": {
            "empViews": body.viewDetails
        }
    }
    Discussions
        .updateOne({ "discussionId": body.discussionId }, updateDiscussion)
        .exec((error, response) => {
            if (error) {
                console.log("Error while updating a discussion document");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while updating a discussion document",
                        "error": error
                    });
            } else if (response.nModified === 0) {
                console.log("Not Updated");
                console.log(response);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Not Updated"
                    });
            } else {
                console.log("Updated Successfully");
                console.log(response);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "Updated Successfully"
                    });
            }
        });
}