const express = require("express");
const router = express.Router();
//Controllers
const authController = require("../controllers/authController");
const userInfoController = require("../controllers/userInfoController");
const orderListController = require("../controllers/orderListController");
const orderDetailsController = require("../controllers/orderDetailsController");
const logOutController = require("../controllers/logOutController");
//Middlewares
const getAccessTokenFromDb = require("../middleware/getAccessTokenFromDb");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router.post("/auth", authController);
router.post(
  "/user/Info",
  verifyAccessToken,
  getAccessTokenFromDb,
  userInfoController
);
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
router.post("/logout", logOutController);

module.exports = router;
