const mongoose = require("mongoose");

let dateTime = require("../shared/date_time");

let Schema = mongoose.Schema;

let empViewsSchema = new Schema({
    "userName": String,
    "view": String,
    "name": String
});

let discussionsSchema = new Schema({
    "discussionId": {
        type: String,
        required: true,
    },
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
    "date": {
        type: String,
        required: true
    },
    "time": {
        type: String,
        required: true
    },
    "dateTime": {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Discussions", discussionsSchema, "discussions");