const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./src/config/db");
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

const allowedOrigins = ['https://prjk-trampoline-fe.vercel.app']

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Gunakan CORS middleware
app.use(cors(corsOptions));

connectDB();

app.use(adminRoutes);
app.use(tiketRoutes);
app.use(login);
app.use(logout);
app.use(RefreshToken);
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

app.listen(process.env.APP_PORT, () => console.log(`Server running on port: http://localhost:${process.env.APP_PORT}`));
