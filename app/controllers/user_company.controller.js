const mongoose = require("mongoose");
const async = require("async");

let UserProfile = mongoose.model("UserProfile");
let UserCompany = mongoose.model("UserCompany");

let dateTime = require("../shared/date_time");

// module.exports.updateIsCompanyStatus = (req, res, next) => {
//     let body = req.body;
//     let userId = body.userId;
//     let isCompany = body.isCompany;
//     let updateStatus = {
//         "$set": {
//             "isCompany": isCompany
//         }
//     }
//     UserProfile
//         .updateOne({ "userId": userId }, updateStatus, (error, isUpdate) => {
//             if (error) {
//                 console.log("Error while updating a user profile");
//                 console.log(error);
//                 res
//                     .status(404)
//                     .send({
//                         "auth": false,
//                         "message": "Error while updating a user profile",
//                         "error": error
//                     });
//             } else {
//                 console.log("User Profile updated Successfully");
//                 console.log(isUpdate);
//                 res
//                     .status(200)
//                     .send({
//                         "auth": true,
//                         "message": "User Profile updated Successfully",
//                     });
//             }
//         });
// }

module.exports.addOneCompanyForOneUser = (req, res, next) => {
    let body = req.body;
    // let isCompany = body.isCompany;

    // if (isCompany === true) {
    let newUserCompany = new UserCompany({
        "companyName": body.companyName,
        "companyAddress": body.companyAddress,
        "areaOfWork": body.areaOfWork,
        "description": body.description,
        "userAdminId": body.userId,
        "date": dateTime.getDateTime().date,
        "time": dateTime.getDateTime().time,
    });

    newUserCompany
        .save((error, response) => {
            if (error) {
                console.log("Error while adding a user company");
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
                            res
                                .status(404)
                                .send({
                                    "auth": false,
                                    "message": "Error while updating a user profile",
                                    "error": error
                                });
                        } else {
                            console.log("User Company added Successfully");
                            console.log("User Profile Updated Successfully with adding company");
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
    // } else {
    //     console.log("Not Eligible for adding company. First activate your 'isCompany' status to true");
    //     res
    //         .status(404)
    //         .send({
    //             "auth": false,
    //             "message": "Not Eligible for adding company. First activate your 'isCompany' status to true",
    //         });
    // }
}

module.exports.getAllUserAdminCompany = (req, res, next) => {
    let body = req.body;
    console.log(body);
    // UserProfile
    //     .findOne({ "userId": body.userId })
    //     .select("companyId")
    //     .exec((error, response) => {
    //         if (error) {
    //             console.log("Error while searching a user Company");
    //             res
    //                 .status(404)
    //                 .send({
    //                     "auth": false,
    //                     "message": "Error while searching a user Company",
    //                     "error": error
    //                 });
    //         } else if (!response) {
    //             console.log("User Profile with the given User Name not found");
    //             res
    //                 .status(404)
    //                 .send({
    //                     "auth": false,
    //                     "message": "User Profile with the given User Name not found",
    //                 });
    //         } else {
    //             console.log("User Profile Found. Looking for his admin companies.");
    //             UserCompany
    //                 .find({ "companyId": { "$in": response.companyId } })
    //                 .select("-_id companyName areaOfWork companyId")
    //                 .exec((error, companies) => {
    //                     if (error) {
    //                         console.log("Error while searching a user Company");
    //                         res
    //                             .status(404)
    //                             .send({
    //                                 "auth": false,
    //                                 "message": "Error while searching a user Company",
    //                                 "error": error
    //                             });
    //                     } else if (companies.length === 0) {
    //                         console.log("User Company with the given User Name not found");
    //                         res
    //                             .status(404)
    //                             .send({
    //                                 "auth": false,
    //                                 "message": "User Company with the given User Name not found",
    //                             });
    //                     } else {
    //                         console.log(companies);
    //                         res
    //                             .status(200)
    //                             .send({
    //                                 "auth": true,
    //                                 "message": "Companies For the given user Found",
    //                                 "companies": companies
    //                             });
    //                     }
    //                 });
    //         }
    //     });

    UserCompany
        .find({ "userAdminId": body.userId })
        .exec((error, companies) => {
            if (error) {
                console.log("Error while searching for User Companies");
                console.log(error);
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching for User Companies",
                        "error": error
                    });
            } if (companies.length === 0) {
                console.log("Their are no companies present with the given userAdminId");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Their are no companies present with the given userAdminId"
                    });
            } else {
                console.log("Companies with the given userAdminId found successfully");
                console.log(companies);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "Companies with the given userAdminId found successfully",
                        "response": companies
                    });
            }
        });
}

module.exports.getAllCompanyOneUser = (req, res, next) => {
    let body = req.body;
    UserProfile
        .findOne({ "userId": body.userId })
        .select("-_id empCompany")
        .exec((error, response) => {
            if (error) {
                console.log("Error while searching a user Profile");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a user Profile",
                        "error": error
                    });
            } else if (!response) {
                console.log("User Profile with the given User Name not found");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "User Profile with the given User Name not found",
                    });
            } else {
                console.log(response);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "User Employee Companies For the given user Found",
                        "response": response.empCompany
                    });
            }
        });
}

module.exports.getOneWorkSpace = (req, res, next) => {
    let body = req.body;
    UserCompany
        .findOne({ "companyId": body.companyId })
        .exec((error, company) => {
            if (error) {
                console.log("Error while searching a user Company");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a user Company",
                        "error": error
                    });
            } else if (!company) {
                console.log("User Company with the given User Name not found");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "User Company with the given User Name not found",
                    });
            } else {
                console.log(company);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "User Company For the given user Found",
                        "response": company
                    });
            }
        });
}

module.exports.addOneEmpToOneCompany = (req, res, next) => {
    let body = req.body;
    // UserCompany
    //     .findOne({ "companyId": body.companyId, "userEmpIds": { "$in": body.userId } }, (error, company) => {
    //         if (error) {
    //             console.log("Error while searching a user company");
    //             res
    //                 .status(404)
    //                 .send({
    //                     "auth": false,
    //                     "message": "Error while searching a user company",
    //                     "error": error
    //                 });
    //         } else if (company) {
    //             console.log("The User name is already present in the company document");
    //             res
    //                 .status(404)
    //                 .send({
    //                     "auth": false,
    //                     "message": "The User name is already present in the company document"
    //                 })
    //         } else {
    //             UserProfile
    //                 .findOne({ "userName": body.userName }, (error, user) => {
    //                     if (error) {
    //                         console.log("Error while searching a user profile");
    //                         res
    //                             .status(404)
    //                             .send({
    //                                 "auth": false,
    //                                 "message": "Error while searching a user profile",
    //                                 "error": error
    //                             });
    //                     } else if (!user) {
    //                         console.log("User Profile with the given User Name not found");
    //                         res
    //                             .status(404)
    //                             .send({
    //                                 "auth": false,
    //                                 "message": "User Profile with the given User Name not found",
    //                             });
    //                     } else {
    //                         let isEmp = company.userEmp.find((element) => {
    //                             if (element.userName === body.userName) {
    //                                 console.log("Its present");
    //                                 return true;
    //                             }
    //                         });
    //                         if (isEmp != true) {
    //                             let updateCompany = {
    //                                 "userEmpIds": {
    //                                     "$push": body.userId
    //                                 }
    //                             }
    //                             UserCompany
    //                                 .updateOne({ "companyId": body.companyId, "userEmpIds": { "$in": body.userId } }, updateCompany, (error, isCompanyUpdate) => {
    //                                     if (error) {
    //                                         console.log("Error while updating a user company");
    //                                         res
    //                                             .status(404)
    //                                             .send({
    //                                                 "auth": false,
    //                                                 "message": "Error while updating a user company",
    //                                                 "error": error
    //                                             });
    //                                     } else {
    //                                         console.log("User Company updated Successfully");
    //                                         let updateUser = {
    //                                             "$push": {
    //                                                 "empCompany": {
    //                                                     "companyId": company.companyId,
    //                                                     "designation": body.designation,
    //                                                     "companyName": company.companyName,
    //                                                     "currentlyWorking": true,
    //                                                     "joiningDate": dateTime.getDateTime().date,
    //                                                     "joiningTime": dateTime.getDateTime().time
    //                                                 }
    //                                             }
    //                                         }
    //                                         UserProfile
    //                                             .updateOne({ "userName": body.userName }, updateUser, (error, isUserUpdate) => {
    //                                                 if (error) {
    //                                                     console.log("Error while updating a user profile");
    //                                                     res
    //                                                         .status(404)
    //                                                         .send({
    //                                                             "auth": false,
    //                                                             "message": "Error while updating a user profile",
    //                                                             "error": error
    //                                                         });
    //                                                 } else {
    //                                                     console.log("User Profile updated Successfully");
    //                                                     res
    //                                                         .status(200)
    //                                                         .send({
    //                                                             "auth": true,
    //                                                             "message": "User Company and User Profile updated Successfully"
    //                                                         });
    //                                                 }
    //                                             });
    //                                     }
    //                                 });
    //                         } else {
    //                             console.log("The User name is already present in the company document");
    //                             res
    //                                 .status(404)
    //                                 .send({
    //                                     "auth": false,
    //                                     "message": "The User name is already present in the company document"
    //                                 });
    //                         }
    //                     }
    //                 });
    //         }
    //     });

    UserProfile
        .findOne({ "userName": body.userName }, (error, user) => {
            if (error) {
                console.log("Error while searching a user profile");
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
                let updateCompany = {
                    "$push": {
                        "userEmpNames": body.userName
                    }
                }
                UserCompany
                    .updateOne({ "companyId": body.companyId, "userEmpNames": { "$ne": body.userName } }, updateCompany, (error, isUpdate) => {
                        if (error) {
                            console.log("Error while searching/updating a user company");
                            console.log(error);
                            res
                                .status(404)
                                .send({
                                    "auth": false,
                                    "message": "Error while searching/updating a user company",
                                    "error": error
                                });
                        } else if (isUpdate.nModified == 0) {
                            console.log("The User name is already present in the company document");
                            console.log(isUpdate);
                            res
                                .status(404)
                                .send({
                                    "auth": false,
                                    "message": "The User name is already present in the company document"
                                })
                        } else {
                            console.log("User Company updated Successfully");
                            let updateUser = {
                                "$push": {
                                    "empCompany": {
                                        "companyId": body.companyId,
                                        "designation": body.designation,
                                        "companyName": body.companyName,
                                        "currentlyWorking": true,
                                        "joiningDate": dateTime.getDateTime().date,
                                        "joiningTime": dateTime.getDateTime().time
                                    }
                                }
                            }
                            UserProfile
                                .updateOne({ "userName": body.userName }, updateUser, (error, isUserUpdate) => {
                                    if (error) {
                                        console.log("Error while updating a user profile");
                                        res
                                            .status(404)
                                            .send({
                                                "auth": false,
                                                "message": "Error while updating a user profile",
                                                "error": error
                                            });
                                    } else if (isUserUpdate.nModified == 0) {
                                        console.log("User profile Not updated");
                                        console.log(isUserUpdate);
                                        res
                                            .status(404)
                                            .send({
                                                "auth": false,
                                                "message": "User profile Not updated"
                                            });
                                    } else {
                                        console.log("User Profile updated Successfully");
                                        console.log(isUserUpdate);
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
            }
        });
}

module.exports.removeEmpFromCompany = (req, res, next) => {
    let body = req.body;
    let companyUpdate = {
        "$pull": {
            "userEmpIds": body.userId
        }
    }
    UserCompany
        .updateOne({ "companyId": body.companyId }, companyUpdate, (error, isCompanyUpdated) => {
            if (error) {
                console.log("Error while updating a user company");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while updating a user company",
                        "error": error
                    });
            } else if (isCompanyUpdated.nModified == 0) {
                console.log("User Company Not uodated");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "User Company Not uodated"
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