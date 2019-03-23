const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userProfileSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "userName": {
        type: String,
        required: true
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
    "companyId": [String]
});

module.exports = mongoose.model("UserProfile", userProfileSchema, "user_profile");