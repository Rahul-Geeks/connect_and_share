const mongoose = require("mongoose");
const shortId = require("shortid");

let dateTime = require("../shared/date_time");

let Schema = mongoose.Schema;

let empCompanySchema = new Schema({
    "companyId": String,
    "designation": String,
    "companyName": String,
    "currentlyWorking": Boolean,
    "joiningDate": String,
    "joiningTime": String,
    "leavingDate": String,
    "leavingTime": String
});

let userProfileSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "userName": {
        type: String,
        required: true,
        unique: true
    },
    "phoneNo": String,
    "password": {
        type: String,
        required: true
    },
    "isCompany": {
        type: Boolean,
        required: true
    },
    "userId": {
        type: String,
        "default": shortId.generate
    },
    "companyId": [String],
    "empCompany": [empCompanySchema],
    "date": {
        type: String,
        "default": dateTime.getDateTime().date,
    },
    "time": {
        type: String,
        "default": dateTime.getDateTime().time,
    }
});

module.exports = mongoose.model("UserProfile", userProfileSchema, "user_profile");