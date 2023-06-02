const axios = require("axios");

const loginValidationController = async (req, res) => {
  const { telephone } = req.body;
  const isValidNumber = /^05[0-9]{8}$/.test(telephone);

  try {
    if (isValidNumber) {
      const loginRes = await axios.post(
        "https://apis.refon-loyalty.com/api/login",
        { telephone }
      );
      if (loginRes.status === 200) {
        return res.sendStatus(200);
      }
    } else {
      return res.status(500).json({ message: "Not Valid Number" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
};
module.exports = loginValidationController;
