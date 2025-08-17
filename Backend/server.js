// app.js or server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employeeRoute"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/leaves", require("./routes/leave"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/payroll", require("./routes/PayRollRoute"));
app.use("/api/notifications", require("./routes/Notification"));
app.use("/api/departments", require("./routes/DepartmentRoute"));
app.use("/api/positions", require("./routes/PositionRoute"));
// app.use("/api/reports", require("./routes/report"));
// app.use("/api/settings", require("./routes/settings"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
