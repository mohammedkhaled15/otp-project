const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const sendToDb = require("../controllers/sendToDb");
const deleteCookie = require("../controllers/deleteCookie");

router.post("/register", registerController);
router.post("/updatedb", sendToDb);
router.post("/logout", deleteCookie);

module.exports = router;
