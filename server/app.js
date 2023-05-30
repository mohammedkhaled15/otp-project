require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
// const credentials = require("./middleware/credentials");

connectDB();
const app = express();
const port = process.env.PORT || 5000;

// app.use(credentials());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`Listening To Port: ${port}`);
});
