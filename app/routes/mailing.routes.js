const express = require("express");

let mailCtrl = require("../controllers/mail.controller");
let router = express.Router();

// updated the "isCompany" status in "user_profile" document
// router
//     .route("/compose")
//     .get(mailCtrl.composeMail);

router
    .route("/inbox")
    .post(mailCtrl.getMailsForOneUser);

module.exports = router;