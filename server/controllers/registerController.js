const User = require("../models/user");

const registerController = async (req, res) => {
  console.log(req.body);
  const tele = req?.body?.telephone;
  if (!tele)
    return res
      .status(500)
      .json({ message: "Please Enter a valid telephone No" });
  try {
    const alreadyExistUser = await User.findOne({ telephone: tele });
    if (alreadyExistUser)
      return res.status(500).json({ message: "Already Existed User" });
    const newUser = await User.create({ telephone: tele });
    return res
      .status(201)
      .json({ message: `New User Created with no (${tele})` });
  } catch (error) {
    console.log(error);
  }
};
module.exports = registerController;
