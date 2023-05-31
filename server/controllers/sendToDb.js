const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const sendToDb = async (req, res) => {
  const { telephone, code } = req?.body;
  const chkRes = await axios.post(
    `https://apis.refon-loyalty.com/api/check/code`,
    {
      telephone,
      code,
    }
  );
  if (chkRes.status === 200) {
    const { name, telephone, access_token } = chkRes.data.data;
    try {
      const alreadyExistUser = await User.findOne({
        telephone,
      });

      if (!alreadyExistUser) {
        await User.create({ telephone, name, access_token });
        const serverAccessToken = jwt.sign(
          { telephone, code },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        return res.status(201).json({
          message: `New User Data Created`,
          authData: { telephone, code, serverAccessToken },
        });
      } else if (alreadyExistUser) {
        await User.findByIdAndUpdate(
          { _id: alreadyExistUser._id },
          { telephone, name, access_token }
        );
        const serverAccessToken = jwt.sign(
          { telephone, code },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
        return res.status(200).json({
          message: `User Data Updated`,
          authData: { telephone, code, serverAccessToken },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Unexpected Error from server" });
    }
  }
};
module.exports = sendToDb;
