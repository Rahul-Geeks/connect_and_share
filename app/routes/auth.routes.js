const express = require("express");

let authCtrl = require("../controllers/auth.controller");
let router = express.Router();

// Generates User Profile
router
    .route("/add_one_user")
    .post(authCtrl.addOneUser);

module.exports = router;