const mongoose = require("mongoose");
const shortId = require("shortid");


let Schema = mongoose.Schema;

let empViewsSchema = new Schema({
    "userId": String,
    "userName": String,
    "view": String
});

let discussionsSchema = new Schema({
    "companyId": {
        type: String,
        required: true
    },
    "topic": {
        type: String,
        required: true
    },
    "description": String,
    "empViews": [empViewsSchema],
    "date": String,
    "time": String
});

module.exports = mongoose.model("Discussions", discussionsSchema, "discussions");