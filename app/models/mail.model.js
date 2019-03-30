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
        "required": true,
    },
    "time": {
        type: String,
        "required": true,
    }
});

module.exports = mongoose.model("Mail", mailSchema, "mail");