const deleteCookie = async (req, res) => {
  cookie = req.cookies;
  console.log(cookie);
  // res.cookie("access_token", undefined, {
  //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  // });
  res.cookie("access_token", { maxAge: 0 });
  res.end();
};

module.exports = deleteCookie;
