const axios = require("axios");

const orderDetailsController = async (req, res) => {
  const access_token = req?.access_token;
  const { test, final_tracking_number } = req.body;
  if (!access_token)
    return res
      .status(401)
      .json({ message: "Not Authorized from Internal Server" });
  try {
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const ordersRes = await axios.post(
      "https://apis.refon-loyalty.com/api/order_info",
      { test, final_tracking_number },
      config
    );
    if (ordersRes.status === 200) {
      return res.status(200).json(ordersRes.data);
    } else if (ordersRes.status === 401) {
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
module.exports = orderDetailsController;
