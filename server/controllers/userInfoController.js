const axios = require("axios");

const userInfoController = async (req, res) => {
  const access_token = req?.access_token;
  if (!access_token)
    return res
      .status(401)
      .json({ message: "Not Authorized from Internal Server" });
  try {
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const userRes = await axios.post(
      "https://apis.refon-loyalty.com/api/user/details",
      {},
      config
    );
    if (userRes.status === 200) {
      return res.status(200).json(userRes.data);
    } else if (userRes.status === 401) {
      return res
        .status(401)
        .json({ message: "Not Authorized from External Server" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unexpected Internal Server Error", error });
  }
};
module.exports = userInfoController;
