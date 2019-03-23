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
    "password": {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model("UserProfile", userProfileSchema, "user_profile");