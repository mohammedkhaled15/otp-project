const axios = require("axios");

const orderListController = async (req, res) => {
  const access_token = req?.access_token;
  if (!access_token)
    return res
      .status(401)
      .json({ message: "Not Authorized from Internal Server" });
  try {
    const config = { headers: { Authorization: `Bearer ${access_token}` } };
    const ordersRes = await axios.post(
      "https://apis.refon-loyalty.com/api/orders_list",
      { list: "1", test: "1" },
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
module.exports = orderListController;
