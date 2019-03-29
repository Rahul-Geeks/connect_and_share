const mongoose = require("mongoose");
const shortId = require("shortid");

let dateTime = require("../shared/date_time");

let Schema = mongoose.Schema;

let mailSchema = new Schema({
    "to": {
        type: String,
        required: true
    },
    "from": {
        type: String,
        required: true
    },
    "message": String,
    "subject": String,
    "date": {
        type: String,
        "default": dateTime.getDateTime().date,
    },
    "time": {
        type: String,
        "default": dateTime.getDateTime().time,
    }
});

module.exports = mongoose.model("Mail", mailSchema, "mail");