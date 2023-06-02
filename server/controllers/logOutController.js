const authController = async (req, res) => {
  try {
    res.clearCookie("telephone", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = authController;
