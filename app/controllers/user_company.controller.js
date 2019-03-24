const mongoose = require("mongoose");
const async = require("async");

let UserProfile = mongoose.model("UserProfile");
let UserCompany = mongoose.model("UserCompany");

let dateTime = require("../shared/date_time");

module.exports.updateIsCompanyStatus = (req, res, next) => {
    let body = req.body;
    let userId = body.userId;
    let isCompany = body.isCompany;
    let updateStatus = {
        "$set": {
            "isCompany": isCompany
        }
    }
    UserProfile
        .updateOne({ "userId": userId }, updateStatus, (error, isUpdate) => {
            if (error) {
                console.log("Error while updating a user profile");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while updating a user profile",
                        "error": error
                    });
            } else {
                console.log("User Profile updated Successfully");
                console.log(isUpdate);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "User Profile updated Successfully",
                    });
            }
        });
}

module.exports.addOneCompanyForOneUser = (req, res, next) => {
    let body = req.body;
    let isCompany = body.isCompany;

    if (isCompany === true) {
        let newUserCompany = new UserCompany({
            "companyName": body.companyName,
            "companyAddress": body.companyAddress,
            "areaOfWork": body.areaOfWork,
            "description": body.description,
            "userAdminId": body.userId
        });

        newUserCompany
            .save((error, response) => {
                if (error) {
                    console.log("Error while adding a user company");
                    console.log(error);
                    res
                        .status(404)
                        .send({
                            "auth": false,
                            "message": "Error while adding a user company",
                            "error": error
                        });
                } else {
                    let userProfileUpdate = {
                        "$push": {
                            "companyId": response.companyId,
                        }
                    }
                    UserProfile
                        .updateOne({ "userId": body.userId }, userProfileUpdate, (error, isUpdate) => {
                            if (error) {
                                console.log("Error while updating a user profile");
                                console.log(error);
                                res
                                    .status(404)
                                    .send({
                                        "auth": false,
                                        "message": "Error while updating a user profile",
                                        "error": error
                                    });
                            } else {
                                console.log("User Company added Successfully");
                                console.log(response);
                                console.log("User Profile Updated Successfully with adding company");
                                console.log(isUpdate);
                                res
                                    .status(200)
                                    .send({
                                        "auth": true,
                                        "message": "User Company added Successfully",
                                        "response": response
                                    });
                            }
                        });
                }
            });
    } else {
        console.log("Not Eligible for adding company. First activate your 'isCompany' status to true");
        res
            .status(404)
            .send({
                "auth": false,
                "message": "Not Eligible for adding company. First activate your 'isCompany' status to true",
            });
    }
}

module.exports.addOneEmpToOneCompany = (req, res, next) => {
    let body = req.body;
    UserCompany
        .findOne({ "companyId": body.companyId }, (error, company) => {
            if (error) {
                console.log("Error while searching a user company");
                // console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a user company",
                        "error": error
                    });
            } else {
                // console.log("something else");
                // console.log(company.userEmp);
                UserProfile
                    .findOne({ "userName": body.userName }, (error, user) => {
                        if (error) {
                            console.log("Error while searching a user profile");
                            // console.log(error);
                            res
                                .status(404)
                                .send({
                                    "auth": false,
                                    "message": "Error while searching a user profile",
                                    "error": error
                                });
                        } else if (!user) {
                            console.log("User Profile with the given User Name not found");
                            res
                                .status(404)
                                .send({
                                    "auth": false,
                                    "message": "User Profile with the given User Name not found",
                                });
                        } else {
                            UserCompany
                            .findOne({"userEmp": body.companyId})
                            .select("userEmp")
                            .exec((error, userEmp)=>{
                                if (error) {
                                    console.log("Error while searching a user profile");
                                    // console.log(error);
                                    res
                                        .status(404)
                                        .send({
                                            "auth": false,
                                            "message": "Error while searching a user profile",
                                            "error": error
                                        });
                                }else{

                                }
                            });
                            let isEmp = company.userEmp.find((element) => {
                                if (element.userName === body.userName) {
                                    console.log("Its present");
                                    return true;
                                }
                            });
                            if (isEmp != true) {
                                let updateCompany = {
                                    "$push": {
                                        "userEmp": {
                                            "userId": user.userId,
                                            "userName": user.userName,
                                            "designation": body.designation,
                                            "joiningDate": dateTime.getDateTime().date,
                                            "joiningTime": dateTime.getDateTime().time
                                        }
                                    }
                                }
                                UserCompany
                                    .updateOne({ "companyId": body.companyId }, updateCompany, (error, isCompanyUpdate) => {
                                        if (error) {
                                            console.log("Error while updating a user company");
                                            // console.log(error);
                                            res
                                                .status(404)
                                                .send({
                                                    "auth": false,
                                                    "message": "Error while updating a user company",
                                                    "error": error
                                                });
                                        } else {
                                            console.log("User Company updated Successfully");
                                            // console.log(isCompanyUpdate);
                                            // console.log(body);

                                            let updateUser = {
                                                "$push": {
                                                    "empCompany": {
                                                        "companyId": company.companyId,
                                                        "designation": body.designation,
                                                        "companyName": company.companyName,
                                                        "currentlyWorking": true
                                                    }
                                                }
                                            }
                                            UserProfile
                                                .updateOne({ "userName": body.userName }, updateUser, (error, isUserUpdate) => {
                                                    if (error) {
                                                        console.log("Error while updating a user profile");
                                                        // console.log(error);
                                                        res
                                                            .status(404)
                                                            .send({
                                                                "auth": false,
                                                                "message": "Error while updating a user profile",
                                                                "error": error
                                                            });
                                                    } else {
                                                        console.log("User Profile updated Successfully");
                                                        // console.log(isUserUpdate);
                                                        res
                                                            .status(200)
                                                            .send({
                                                                "auth": true,
                                                                "message": "User Company and User Profile updated Successfully"
                                                            });
                                                    }
                                                });
                                        }
                                    });
                            } else {
                                console.log("The User name is already present in the company document");
                                res
                                    .status(404)
                                    .send({
                                        "auth": false,
                                        "message": "The User name is already present in the company document"
                                    });
                            }
                        }
                    });
            }
        });
}

module.exports.removeEmpFromCompany = (req, res, next) => {
    let body = req.body;
    let companyUpdate = {
        "userEmp": {
            "$pull": { "userName": { "$all": body.userName } }
        }
    }
    UserCompany
        .findOneAndUpdate({ "companyId": body.companyId }, companyUpdate, (error, isCompanyUpdated) => {
            if (error) {
                console.log("Error while updating a user company");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while updating a user company",
                        "error": error
                    });
            } else {
                console.log("The given user name/s of employee/s are successfully removed from the given company");
                console.log(isCompanyUpdated);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "The given user name/s of employee/s are successfully removed from the given company"
                    });
            }
        });
}