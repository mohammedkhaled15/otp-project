const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userInfoController = require("../controllers/userInfoController");
const orderListController = require("../controllers/orderListController");
const getAccessTokenFromDb = require("../middleware/getAccessTokenFromDb");
const orderDetailsController = require("../controllers/orderDetailsController");

router.post("/auth", authController);
router.post("/user/Info", getAccessTokenFromDb, userInfoController);
router.post("/orders_list", getAccessTokenFromDb, orderListController);
router.post("/order_details", getAccessTokenFromDb, orderDetailsController);

module.exports = router;
