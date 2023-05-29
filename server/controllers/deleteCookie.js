const deleteCookie = async (req, res) => {
  res.cookie("access_token", undefined, {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(204).end();
};

module.exports = deleteCookie;
