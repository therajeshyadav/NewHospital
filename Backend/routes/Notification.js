// routes/notifications.js
const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

// GET /api/notifications - Get user notifications
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, type, read } = req.query;

    let query = { recipient: req.user.employeeId };

    if (type) query.type = type;
    if (read !== undefined) query.read = read === "true";

    const notifications = await Notification.find(query)
      .populate("sender", "firstName lastName")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Notification.countDocuments(query);

    res.json({
      success: true,
      data: notifications,
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
});

// POST /api/notifications - Send notification
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["admin", "manager"]),
  async (req, res) => {
    try {
      const { recipients, title, message, type, priority, actionUrl } =
        req.body;

      const notifications = [];

      for (const recipientId of recipients) {
        const notification = new Notification({
          recipient: recipientId,
          sender: req.user.employeeId,
          title,
          message,
          type,
          priority,
          actionUrl,
        });

        notifications.push(notification);
      }

      await Notification.insertMany(notifications);

      res.status(201).json({
        success: true,
        message: "Notifications sent successfully",
        data: notifications,
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

// PUT /api/notifications/:id/read - Mark notification as read
router.put("/:id/read", authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    if (notification.recipient.toString() !== req.user.employeeId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this notification",
      });
    }

    notification.read = true;
    notification.readAt = new Date();
    await notification.save();

    res.json({
      success: true,
      message: "Notification marked as read",
      data: notification,
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
