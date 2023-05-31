const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      res.status(401).json("Access not Authorized No Token In Headers");
      return;
    }
    const serverAccessToken = authHeaders.split(" ")[1];
    jwt.verify(serverAccessToken, process.env.JWT_SECRET, (error, user) => {
      if (error)
        return res
          .status(401)
          .json("Access not Authorized due to problems in accessToken");
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json("Access not Authorized");
  }
};

module.exports = verifyAccessToken;
