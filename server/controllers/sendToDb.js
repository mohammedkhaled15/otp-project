const User = require("../models/user");

const sendToDb = async (req, res) => {
  const userData = req?.body;
  console.log(req.body);
  try {
    const alreadyExistUser = await User.findOne({
      telephone: userData.telephone,
    });
    if (!alreadyExistUser) {
      await User.create({ ...userData });
      return res.status(201).json({ message: `New User Data Created` });
    } else {
      await User.findByIdAndUpdate(
        { _id: alreadyExistUser._id },
        { ...userData }
      );
      return res.status(201).json({ message: `User Data Updated` });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendToDb;
