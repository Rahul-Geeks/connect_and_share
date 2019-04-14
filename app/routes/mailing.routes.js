const express = require("express");

let mailCtrl = require("../controllers/mail.controller");
let authCtrl = require("../controllers/auth.controller");
let router = express.Router();

// updated the "isCompany" status in "user_profile" document
// router
//     .route("/compose")
//     .get(mailCtrl.composeMail);

router
    .route("/inbox")
    .post(authCtrl.tokenValidator, mailCtrl.getMailsForOneUser);

router
    .route("/sent")
    .post(authCtrl.tokenValidator, mailCtrl.getSentMailsForOneUser);

// router
//     .route("/upload")
//     .post(mailCtrl.upload);

module.exports = router;