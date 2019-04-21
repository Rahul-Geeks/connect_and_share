const mongoose = require("mongoose");

let Discussions = mongoose.model("Discussions");
let UserProfile = mongoose.model("UserProfile");
let dateTime = require("../shared/date_time");
const shortId = require("shortid");

module.exports.addDiscussion = (req, res, next) => {
    let body = req.body;
    console.log(body);
    let newDiscussion = new Discussions({
        "topic": body.topic,
        "description": body.description,
        "companyId": body.companyId,
        "date": dateTime.getDateTime().date,
        "time": dateTime.getDateTime().time,
        "dateTime": new Date(),
        "discussionId": shortId.generate()
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
        .sort([["dateTime", -1]])
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
                console.log("Discussions For the given user Found");

                // console.log(response);
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

module.exports.getOneDiscussion = (req, res, next) => {
    let body = req.body;
    Discussions
        .findOne({ "discussionId": body.discussionId })
        .exec((error, discussion) => {
            if (error) {
                console.log("Error while searching a Discussion");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a Discussion",
                        "error": error
                    });
            } else {
                console.log("Discussion Found");
                // console.log(response);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "Discussion Found",
                        "response": discussion
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

module.exports.saveViewsToWorkSpace = (body) => {
    let viewDetails = {
        "$push": {
            "empViews": {
                "view": body.view,
                "userName": body.userName,
                "name": body.name
            }
        }
    }
    Discussions
        .updateOne({ "discussionId": body.discussionId }, viewDetails, (error, isUpdate) => {
            if (error) {
                console.log("Error while updating a discussion document");
                console.log(error);
            } else if (isUpdate.nModified === 0) {
                console.log("Not Updated");
                console.log(isUpdate);
            } else {
                console.log("Updated Successfully");
                console.log(isUpdate);
            }
        });
}

module.exports.deleteView = (req, res, next) => {
    let body = req.body;
    console.log(body);
    Discussions
        .findOne({ "discussionId": body.discussionId })
        .exec((error, response) => {
            if (error) {
                console.log("Error while searching the discussion document");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching the discussion document",
                        "error": error
                    });
            } else {
                console.log(response);
                console.log("The discussion searched");
                let view = response.empViews.find((element) => {
                    console.log("id is", element._id);
                    return element._id == body._id
                });
                console.log(view);
                Discussions
                    .updateOne({ "discussionId": body.discussionId }, { "$pull": { "empViews": view } })
                    .exec((error, response2) => {
                        if (error) {
                            console.log("Error while updating the discussion document");
                            console.log(error);
                            res
                                .status(404)
                                .send({
                                    "auth": false,
                                    "message": "Error while updating the discussion document",
                                    "error": error
                                });
                        } else if (response2.nModified == 0) {
                            console.log("View not deleted");
                            console.log(response2);
                            res
                                .status(404)
                                .send({
                                    "auth": false,
                                    "message": "View not deleted"
                                });
                        } else {
                            console.log("View deleted successfully");
                            console.log(response2);
                            res
                                .status(200)
                                .send({
                                    "auth": true,
                                    "message": "View deleted successfully"
                                });
                        }
                    });
            }
        });
}

module.exports.getCurrentDiscussion = (req, res, next) => {
    let body = req.body;
    console.log(body);
    UserProfile
        .findOne({ "userId": body.userId })
        .exec((error, response1) => {
            if (error) {
                console.log("Error while searching for a user profile document");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching for a user profile document",
                        "error": error
                    });
            } else {
                console.log("User Profile searched successfully");
                console.log(response1);
                let companyId = response1.companyId;
                response1.empCompany.find((element)=>{
                    companyId.push(element.companyId);
                });
                Discussions
                    .find({ "companyId": { "$in": companyId } })
                    .sort([["dateTime", -1]])
                    .limit(3)
                    .exec((error, response) => {
                        if (error) {
                            console.log("Error while searching for current three discussion documents");
                            console.log(error);
                            res
                                .status(404)
                                .send({
                                    "auth": false,
                                    "message": "Error while searching for current three discussion documents",
                                    "error": error
                                });
                        } else {
                            console.log("Current docs searched successfully");
                            res
                                .status(200)
                                .send({
                                    "auth": true,
                                    "message": "Current docs searched successfully",
                                    "response": response
                                });
                        }
                    });
            }
        });
}