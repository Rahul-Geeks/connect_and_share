const mongoose = require("mongoose");
const shortId = require("shortid");

let dateTime = require("../shared/date_time");

let Schema = mongoose.Schema;

let userCompanySchema = new Schema({
    "companyName": {
        type: String,
        required: true
    },
    "companyAddress": {
        type: String,
        required: true
    },
    "areaOfWork": {
        type: String,
        required: true
    },
    "description": String,
    "companyId": {
        type: String,
        'default': shortId.generate
    },
    "userAdminId": {
        type: String,
        required: true
    },
    "userEmpIds": [String],
    "date": {
        type: String,
        "default": dateTime.getDateTime().date,
    },
    "time": {
        type: String,
        "default": dateTime.getDateTime().time,
    }
});

module.exports = mongoose.model("UserCompany", userCompanySchema, "user_company");