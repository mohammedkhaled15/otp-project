require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const { config } = require("dotenv");

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`Listening To Port: ${port}`);
});
