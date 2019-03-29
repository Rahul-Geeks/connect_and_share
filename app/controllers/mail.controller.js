const path = require("path");
const mongoose = require("mongoose");

let Mail = mongoose.model("Mail");

module.exports.composeMail = (req, res, next) => {
    let resolve = path.resolve("index.html");
    console.log(resolve);
    res
        .status(200)
        .sendFile(resolve);
}

module.exports.saveMail = (mail) => {
    let newMail = new Mail({
        "to": mail.to,
        "from": mail.from,
        "message": mail.message,
        "subject": mail.subject,
    });

    newMail
        .save((error, response) => {
            if (error) {
                console.log("Error while adding a user company");
                console.log(error);
            } else {
                console.log("Mail saved successfully");
                console.log(response);
            }
        });
}