const express = require("express");
const router = express.Router();
const sendToDb = require("../controllers/sendToDb");
const createJWT = require("../controllers/createJwt");
const getAccessToken = require("../controllers/getAtFromDb");

router.post("/updatedb", sendToDb);
router.post("/createjwt", createJWT);
router.post("/getAccess", getAccessToken);

module.exports = router;
