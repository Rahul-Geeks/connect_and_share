const express = require("express");

let router = express.Router();

let discussionCtrl = require("../controllers/discussion.controller");

// adding a discussion document
router
    .route("/add_discussion")
    .post(discussionCtrl.addDiscussion);

// get all the discussions for a particular workspace
router
    .route("/getall_discussions_oneworkspace")
    .post(discussionCtrl.getAllDiscussionsOneWorkSpace);

module.exports = router;