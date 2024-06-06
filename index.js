const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./src/routes/AdminRoute");
const tiketRoutes = require("./src/routes/TiketRoute");
const login = require("./src/routes/LoginRoute");
const logout = require("./src/routes/LogoutRoute");
const RefreshToken = require("./src/routes/RefreshTokenRoute");
require("dotenv").config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(process.env.APP_PORT, () => {
      console.log(`Node API app is running on port ${process.env.APP_PORT}`);
    });
    console.log("mantap");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(adminRoutes);
app.use(tiketRoutes);
app.use(login);
app.use(logout);
app.use(RefreshToken);
