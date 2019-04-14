const path = require("path");
const mongoose = require("mongoose");

let Mail = mongoose.model("Mail");
const incomingForm = require("formidable").IncomingForm;

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
        "date": mail.date,
        "time": mail.time
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

module.exports.getMailsForOneUser = (req, res, next) => {
    let body = req.body;
    console.log("Te body is:");
    console.log(body);
    Mail
        .find({ "to": body.userName })
        // .sort({ "date": 1 })
        .exec((error, mails) => {
            if (error) {
                console.log("Error while searching a user profile");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching a user profile",
                        "error": error
                    });
            } else if (!mails) {
                console.log("No Mails Present");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "No Mails Present",
                    });
            } else {
                console.log(mails);
                res
                    .status(200)
                    .send(mails);
            }
        });
}

module.exports.getSentMailsForOneUser = (req, res, next) => {
    let body = req.body;
    Mail
        .find({ "from": body.userName })
        .exec((error, mails) => {
            if (error) {
                console.log("Error while searching mails");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "Error while searching mails",
                        "error": error
                    });
            } else if (!mails) {
                console.log("No Mails Present");
                res
                    .status(404)
                    .send({
                        "auth": false,
                        "message": "No Mails Present",
                    });
            } else {
                console.log(mails);
                res
                    .status(200)
                    .send({
                        "auth": true,
                        "message": "Mails Found Successfully",
                        "response": mails
                    });
            }
        });
}

// module.exports.upload = (req, res, next)=>{
//     let form = new incomingForm();
//     form.on("file", (field, file)=>{
//         Mail
//         .u
//     });
//     form.on("end", ()=>{
//         res
//         .status(200)
//         .send({
//             "auth": true,
//             "message": "File successfully uploaded"
//         });
//     })
// }