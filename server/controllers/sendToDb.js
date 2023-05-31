const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const sendToDb = async (req, res) => {
  const { telephone, code, access_token } = req?.body;
  const chkRes = await axios.post(
    `https://apis.refon-loyalty.com/api/check/code`,
    {
      telephone,
      code,
    }
  );
  if (chkRes.status === 200) {
    try {
      const alreadyExistUser = await User.findOne({
        telephone,
      });

      if (!alreadyExistUser) {
        await User.create({ telephone, code, access_token });
        return res.status(201).json({ message: `New User Data Created` });
      } else if (alreadyExistUser) {
        const serverAccessToken = jwt.sign(
          { telephone, code },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );
      } else {
        await User.findByIdAndUpdate(
          { _id: alreadyExistUser._id },
          { telephone, code, access_token }
        );
      }

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
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = sendToDb;
