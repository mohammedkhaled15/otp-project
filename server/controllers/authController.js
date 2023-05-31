const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authController = async (req, res) => {
  const { telephone, code } = req.body;

  try {
    const chkResponse = await axios.post(
      `https://apis.refon-loyalty.com/api/check/code`,
      { telephone, code }
    );
    if (chkResponse.status === 200) {
      const serverAccessToken = jwt.sign(
        { telephone, code },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      const { access_token, name } = chkResponse.data.data;

      const foundedUserinDb = await User.findOne({ telephone });

      if (foundedUserinDb) {
        foundedUserinDb.access_token = access_token;
        await foundedUserinDb.save();
      } else if (!foundedUserinDb) {
        await User.create({ telephone, access_token, name });
      }

      return res
        .status(200)
        .json({ authData: { telephone, name, serverAccessToken } });
    } else if (chkResponse.status === 401) {
      return res
        .status(401)
        .json({ message: "Not Authorized From The External Server" });
    } else {
      return res.status(500).json({ message: "Unexpected Server Error" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Unexpected Server Error" });
  }
};

module.exports = authController;
