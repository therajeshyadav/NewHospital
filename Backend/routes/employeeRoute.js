// routes/employees.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Employee = require("../models/Employee");
const User = require("../models/user");
const Task = require("../models/tasks");
const Department = require("../models/department");
const Attendance = require("../models/attendance");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

// GET /api/employees - Get all employees (Admin only)
router.get(
  "/",
  authenticateToken,
  authorizeRoles(["admin"]),
  async (req, res) => {
    try {
      const { page = 1, limit = 10, search, department, status } = req.query;

      let query = {};

      if (search) {
        query.$or = [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { employeeId: { $regex: search, $options: "i" } },
        ];
      }

      if (department) {
        query.department = department;
      }

      if (status) {
        query.isActive = status === "active";
      }

      const employees = await Employee.find(query)
        .populate("userId", "name email profilePicture")
        .populate("department", "name")
        .populate("position", "title")
        .populate("manager", "firstName lastName")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      const total = await Employee.countDocuments(query);

      res.json({
        success: true,
        data: employees,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);

// GET /api/employees/me - Get current employee profile
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.employeeId)
      .populate("userId", "name email profilePicture")
      .populate("department", "name")
      .populate("position", "title")
      .populate("manager", "firstName lastName");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const empObj = employee.toObject();

    // flatten userId fields into main object
    const flattened = {
      ...empObj,
      email: empObj.userId?.email,
      name: empObj.userId?.name,
      profilePicture: empObj.userId?.profilePicture,
    };

    // remove userId object completely
    delete flattened.userId;

    res.json({
      success: true,
      data: flattened,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// GET /api/employees/:id - Get specific employee
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id)
        .populate("userId", "name email profilePicture")
        .populate("department", "name")
        .populate("position", "title")
        .populate("manager", "firstName lastName");

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      res.json({
        success: true,
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);

// POST /api/employees - Create new employee (Admin only)
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["admin"]),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        department,
        position,
        salary,
        joiningDate,
        address,
        emergencyContact,
      } = req.body;

      // Create user account
      const user = new User({
        name: `${firstName} ${lastName}`,
        email,
        password: "123456", // Default password
        role: "employee",
      });

      await user.save();

      // Generate employee ID
      const employeeCount = await Employee.countDocuments();
      const employeeId = `EMP${String(employeeCount + 1).padStart(3, "0")}`;

      // Create employee profile
      const employee = new Employee({
        userId: user._id,
        employeeId,
        firstName,
        lastName,
        phone,
        department,
        position,
        salary,
        joiningDate,
        address,
        emergencyContact,
      });

      await employee.save();

      res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);

// PUT /api/employees/:id - Update employee (Admin only)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (req.user.role === "employee") {
      if (req.user.employeeId !== req.params.id) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to update this profile",
        });
      }

      const {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        bloodGroup,
        address = {},
        emergencyContact = {},
        ...otherFields
      } = req.body;

      let updateData = {};
      if (req.user.role === "employee") {
        updateData = {
          firstName: firstName || employee.firstName,
          lastName: lastName || employee.lastName,
          email: email || employee.email,
          phone: phone || employee.phone,
          dateOfBirth: dateOfBirth || employee.dateOfBirth,
          bloodGroup: bloodGroup || employee.bloodGroup,
          address: { ...employee.address, ...address },
          emergencyContact: {
            ...employee.emergencyContact,
            ...emergencyContact,
          },
        };
      } else if (req.user.role === "admin") {
        updateData = {
          firstName: firstName || employee.firstName,
          lastName: lastName || employee.lastName,
          email: email || employee.email,
          phone: phone || employee.phone,
          dateOfBirth: dateOfBirth || employee.dateOfBirth,
          bloodGroup: bloodGroup || employee.bloodGroup,
          address: { ...employee.address, ...address },
          emergencyContact: {
            ...employee.emergencyContact,
            ...emergencyContact,
          },
          ...otherFields,
        };
      }

      const userUpdate = {};

      if (firstName || lastName)
        userUpdate.name = `${firstName || employee.firstName} ${
          lastName || employee.lastName
        }`;
      if (email) userUpdate.email = email;
      //  if (profilePicture) userUpdate.profilePicture = profilePicture;
      if (Object.keys(userUpdate).length > 0) {
        await User.findByIdAndUpdate(employee.userId, userUpdate, {
          new: true,
        });
      }

      const updateEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).populate("userId", "name email profilePicture");
      if (!updateEmployee) {
        return res
          .status(404)
          .json({ success: false, message: "Employee not found" });
      }
      return res.json({
        success: true,
        message: "Profile updated successfully",
        data: updateEmployee,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// DELETE /api/employees/:id - Delete employee (Admin only)
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(["admin"]),
  async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      // Delete associated user account
      await User.findByIdAndDelete(employee.userId);

      // Delete employee
      await Employee.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
);

// GET /api/employees/stats/:id - Get employee statistics
router.get("/stats/:id", authenticateToken, async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Get attendance stats
    const attendanceStats = await Attendance.aggregate([
      { $match: { employee: new mongoose.Types.ObjectId(employeeId) } },
      {
        $group: {
          _id: null,
          totalDays: { $sum: 1 },
          presentDays: {
            $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] },
          },
          absentDays: {
            $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] },
          },
          lateDays: { $sum: { $cond: [{ $eq: ["$status", "late"] }, 1, 0] } },
        },
      },
    ]);

    // Get task stats
    const taskStats = await Task.aggregate([
      { $match: { assignedTo: new mongoose.Types.ObjectId(employeeId) } },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          activeTasks: {
            $sum: {
              $cond: [{ $in: ["$status", ["pending", "in-progress"]] }, 1, 0],
            },
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        attendance: attendanceStats[0] || {
          totalDays: 0,
          presentDays: 0,
          absentDays: 0,
          lateDays: 0,
        },
        tasks: taskStats[0] || {
          totalTasks: 0,
          completedTasks: 0,
          activeTasks: 0,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
