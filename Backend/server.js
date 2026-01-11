require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./configs/db");
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:4200"];
const users = require("./routes/users.routes");
const categories = require("./routes/categories.routes");

connectDB();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🏃🏻‍♂️ API is Running");
});

//! Routes
app.use("/api/users", users);
app.use("/api/categories", categories);

//! Upload Middleware
app.use("/uploads", express.static("uploads"));

//! Error Handling Middleware
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({
      message: err.message,
    });
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server Running At ===> http://localhost:${PORT}`);
});
