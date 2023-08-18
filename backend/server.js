const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orderRoutes");

require("dotenv").config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
const DB_URI =
  "mongodb+srv://usama:usama@cluster0.iqyds.mongodb.net/UsersOrderManagement?retryWrites=true&w=majority";
mongoose.connect(DB_URI).then(() => console.log("MONGO DB CONNECTED ..."));

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on port", PORT));
