const express = require("express");

let authCtrl = require("../controllers/auth.controller");
let router = express.Router();

// Generates User Profile
router
    .route("/add_one_user")
    .post(authCtrl.addOneUser);

// Deletes User Profile
router
    .route("/delete_one_user")
    .post(authCtrl.deleteOneUser);

// Login for a user
router
    .route("/user_login")
    .post(authCtrl.userLogin);

module.exports = router;