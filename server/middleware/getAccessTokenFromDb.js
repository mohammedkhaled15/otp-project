const User = require("../models/user");

const getAccessTokenFromDb = async (req, res, next) => {
  // const { telephone } = req?.body;
  const cookies = req?.cookies;
  // if (!cookies?.telephone) res.status(401);
  const telephone = cookies.telephone;
  console.log(telephone);
  if (!telephone)
    return res.status(511).json({ message: "Bad Request to DB Api" });
  try {
    const foundedUser = await User.findOne({ telephone });
    if (!foundedUser) {
      return res.status(500).json({ message: "No User Record in DB" });
    } else {
      const access_token = foundedUser?.access_token;
      req.access_token = access_token;
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Unexpected Server Error" });
  }
};

module.exports = getAccessTokenFromDb;
