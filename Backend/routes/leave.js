// routes/leaves.js
const express = require('express');
const router = express.Router();
const Leave = require('../models/leave');
const Employee = require('../models/Employee');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// GET /api/leaves - Get all leave requests
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, employee, startDate, endDate } = req.query;
    
    let query = {};
    
    // If not admin, only show own leaves
    if (req.user.role !== 'admin') {
      query.employee = req.user.employeeId;
    } else if (employee) {
      query.employee = employee;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (startDate && endDate) {
      query.startDate = { $gte: new Date(startDate) };
      query.endDate = { $lte: new Date(endDate) };
    }
    
    const leaves = await Leave.find(query)
      .populate('employee', 'firstName lastName employeeId')
      .populate('approvedBy', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Leave.countDocuments(query);
    
    res.json({
      success: true,
      data: leaves,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// POST /api/leaves - Submit leave request
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      leaveType, startDate, endDate, reason, documents
    } = req.body;
    
    // Calculate number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    // Check leave balance
    const employee = await Employee.findById(req.user.employeeId);
    const leaveBalance = employee.leaveBalance[leaveType];
    
    if (days > leaveBalance) {
      return res.status(400).json({
        success: false,
        message: `Insufficient ${leaveType} leave balance. Available: ${leaveBalance} days`
      });
    }
    
    const leave = new Leave({
      employee: req.user.employeeId,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      documents
    });
    
    await leave.save();
    
    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: leave
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// PUT /api/leaves/:id/approve - Approve leave request (Admin/Manager only)
router.put('/:id/approve', authenticateToken, authorizeRoles(['admin', 'manager']), async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }
    
    leave.status = 'approved';
    leave.approvedBy = req.user.employeeId;
    leave.approvedAt = new Date();
    
    // Deduct leave balance
    const employee = await Employee.findById(leave.employee);
    employee.leaveBalance[leave.leaveType] -= leave.days;
    await employee.save();
    
    await leave.save();
    
    res.json({
      success: true,
      message: 'Leave request approved successfully',
      data: leave
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// PUT /api/leaves/:id/reject - Reject leave request (Admin/Manager only)
router.put('/:id/reject', authenticateToken, authorizeRoles(['admin', 'manager']), async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    
    const leave = await Leave.findById(req.params.id);
    
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }
    
    leave.status = 'rejected';
    leave.approvedBy = req.user.employeeId;
    leave.approvedAt = new Date();
    leave.rejectionReason = rejectionReason;
    
    await leave.save();
    
    res.json({
      success: true,
      message: 'Leave request rejected successfully',
      data: leave
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// GET /api/leaves/balance/:employeeId - Get leave balance
router.get('/balance/:employeeId', authenticateToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    res.json({
      success: true,
      data: employee.leaveBalance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;