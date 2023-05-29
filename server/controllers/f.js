const axios = require("axios");
const User = require("../models/user");

// Handle the code request
exports.getCode = async (req, res) => {
  try {
    const response = await axios.get(
      "https://apis.refon-loyalty.com/api/check/code"
    );

    if (response.status === 200) {
      const { access_token, telephone, name } = response.data;

      // Store the data in the database
      const newData = new User({ access_token, telephone, name });
      await newData.save();

      // Return the data in the response
      res.json({ access_token, telephone, name });
    } else if (response.status === 404) {
      throw new Error("The activation code field is required.");
    } else {
      throw new Error("An error occurred while fetching the data.");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
