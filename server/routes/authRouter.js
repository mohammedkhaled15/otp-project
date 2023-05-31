const express = require("express");
const router = express.Router();
//Controllers
const authController = require("../controllers/authController");
const userInfoController = require("../controllers/userInfoController");
const orderListController = require("../controllers/orderListController");
const orderDetailsController = require("../controllers/orderDetailsController");
//Middlewares
const getAccessTokenFromDb = require("../middleware/getAccessTokenFromDb");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router.post("/auth", authController);
router.post("/user/Info", getAccessTokenFromDb, userInfoController);
router.post(
  "/orders_list",
  verifyAccessToken,
  getAccessTokenFromDb,
  orderListController
);
router.post(
  "/order_details",
  verifyAccessToken,
  getAccessTokenFromDb,
  orderDetailsController
);

module.exports = router;
