// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// GET /api/tasks - Get all tasks
router.get('/', authenticateToken,authorizeRoles(['admin']), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, assignedTo, assignedBy } = req.query;
    
    let query = {};
    
    // If not admin, only show assigned tasks
    if (req.user.role !== 'admin') {
      query.assignedTo = req.user.employeeId;
    } else {
      if (assignedTo) query.assignedTo = assignedTo;
      if (assignedBy) query.assignedBy = assignedBy;
    }
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    
    const tasks = await Task.find(query)
      .populate('assignedTo', 'firstName lastName employeeId')
      .populate('assignedBy', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Task.countDocuments(query);
    
    res.json({
      success: true,
      data: tasks,
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

// POST /api/tasks - Create new task
router.post('/', authenticateToken, authorizeRoles(['admin']) ,async (req, res) => {
  try {
    const {
      title, description, assignedTo, priority, category, dueDate
    } = req.body;
    
    const task = new Task({
      title,
      description,
      assignedTo,
      assignedBy: req.user.employeeId,
      priority,
      category,
      dueDate
    });
    
    await task.save();
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Only assigned person or admin can update
    if (task.assignedTo.toString() !== req.user.employeeId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'firstName lastName')
     .populate('assignedBy', 'firstName lastName');
    
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});



// PUT /api/tasks/:id/status - Update task status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, progress } = req.body;
    
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    task.status = status;
    if (progress !== undefined) task.progress = progress;
    
    if (status === 'completed') {
      task.completedAt = new Date();
    }
    
    await task.save();
    
    res.json({
      success: true,
      message: 'Task status updated successfully',
      data: task
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