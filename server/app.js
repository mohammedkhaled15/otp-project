require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`Listening To Port: ${port}`);
});
