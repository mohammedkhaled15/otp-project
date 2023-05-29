const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createJWT = async (req, res) => {
  // console.log(req?.body);
  const { access_token, ...other } = req?.body;
  console.log(access_token);
  try {
    const newAccessToken = jwt.sign({ ...other }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // const foundedUser = await User.findOne({ access_token: accessToken });
    const updatedDoc = await User.findOneAndUpdate(
      { access_token: access_token },
      { access_token: newAccessToken },
      { returnDocument: "after" }
    );
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // console.log(updatedDoc);
    if (updatedDoc) {
      return res.json({ access_token: newAccessToken }).end();
    } else {
      return res.status(500).json({ message: "errrror" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unexpected Internal server Error" })
      .end();
  }
};

module.exports = createJWT;
