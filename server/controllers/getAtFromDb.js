const User = require("../models/user");

const getAtFromDb = async (req, res) => {
  const { telephone } = req?.body;
  if (!telephone)
    return res.status(511).json({ message: "Bad Request to DB Api" });
  try {
    const foundedUser = await User.findOne({ telephone });
    if (!foundedUser)
      return res.status(500).json({ message: "No User Record in DB" });
    const access_token = foundedUser?.access_token;
    return res
      .status(200)
      .json({ message: "Got access token successed", access_token });
  } catch (error) {
    return res.status(500).json({ message: "Unexpected Server Error" });
  }
};

module.exports = getAtFromDb;
