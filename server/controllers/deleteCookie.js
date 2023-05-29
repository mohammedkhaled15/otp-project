const deleteCookie = async (req, res) => {
  res.cookie("access_token", "none", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(204);
};

module.exports = deleteCookie;
