const mongoose = require("mongoose");
const shortId = require("shortid");

let dateTime = require("../shared/date_time");

let Schema = mongoose.Schema;

let empViewsSchema = new Schema({
    "userId": String,
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
    "date": {
        type: String,
        default: dateTime.getDateTime().date
    },
    "time": {
        type: String,
        default: dateTime.getDateTime().time
    }
});

module.exports = mongoose.model("Discussions", discussionsSchema, "discussions");