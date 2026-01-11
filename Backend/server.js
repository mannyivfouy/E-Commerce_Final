require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./configs/db");
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:4200"];
const users = require("./routes/users.routes");

connectDB();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🏃🏻‍♂️ API is Running");
});

//!
app.use("/api/users", users);

app.use("/uploads", express.static("uploads"));
//!

app.listen(PORT, () => {
  console.log(`🚀 Server Running At ===> http://localhost:${PORT}`);
});
