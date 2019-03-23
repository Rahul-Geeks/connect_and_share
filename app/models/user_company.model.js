const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userComapanySchema = new Schema({
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
        required: true
    }
});

module.exports = mongoose.model("UserCompany", userComapanySchema, "user_company");