const axios = require("axios");

const getFullResponse = async (req, res) => {
  const { telephone, code } = req?.body;
  if (!telephone || !code)
    return res.status(500).json({ message: "Invalid telephone No or Code" });
  try {
    const response = await axios.post(
      "https://apis.refon-loyalty.com/api/check/code",
      { telephone, code }
    );
    if (response.status === 200) return res.status(200).json(res.data);
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected Error" });
  }
};

module.exports = getFullResponse;
