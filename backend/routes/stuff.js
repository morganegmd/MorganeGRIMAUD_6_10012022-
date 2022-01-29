const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
const updateAnUserImage = require("../controllers/user");

router.patch("/user/:_id", upload, updateAnUserImage);

module.exports = router;
