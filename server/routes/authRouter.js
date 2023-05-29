const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const sendToDb = require("../controllers/sendToDb");
const createJWT = require("../controllers/createJwt");

router.post("/register", registerController);
router.post("/updatedb", sendToDb);
router.post("/createjwt", createJWT);

module.exports = router;
