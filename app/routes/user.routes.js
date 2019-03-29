const express = require("express");

let userCtrl = require("../controllers/user.controller");
let authCtrl = require("../controllers/auth.controller");
let router = express.Router();

// Searches a user using their "userId" field
router
    .route("/get_one_user")
    .post(userCtrl.getOneUser);

// Searches a userId using their "userName" field
router
    .route("/get_one_userId")
    .post(userCtrl.getOneUserId);

// Deletes User Profile
router
    .route("/delete_one_user")
    .post(userCtrl.deleteOneUser);

module.exports = router;