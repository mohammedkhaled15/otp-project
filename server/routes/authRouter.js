const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const sendToDb = require("../controllers/sendToDb");

router.post("/register", registerController);
router.post("/updatedb", sendToDb);

module.exports = router;
