const express = require("express");

let router = express.Router();

let discussionCtrl = require("../controllers/discussion.controller");
let authCtrl = require("../controllers/auth.controller");

// adding a discussion document
router
    .route("/add_discussion")
    .post(authCtrl.tokenValidator, discussionCtrl.addDiscussion);

// get all the discussions for a particular workspace
router
    .route("/getall_discussions_oneworkspace")
    .post(authCtrl.tokenValidator, discussionCtrl.getAllDiscussionsOneWorkSpace);

// get one discussion for a particular workspace
router
    .route("/getOneDiscussion")
    .post(authCtrl.tokenValidator, discussionCtrl.getOneDiscussion);

// Add one view to a particular discussion
router
    .route("/add_one_view")
    .post(authCtrl.tokenValidator, discussionCtrl.addOneView);

router
    .route("/deleteView")
    .post(discussionCtrl.deleteView);

router
    .route("/getCurrentDiscussion")
    .post(discussionCtrl.getCurrentDiscussion);
module.exports = router;