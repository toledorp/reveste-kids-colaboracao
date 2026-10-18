import Notification from "../models/Notification.js";

class NotificationService {
  async createNotification(data) {
    return await Notification.create({
      ...data,
      active: true,
      read: false,
    });
  }

  async getUserNotifications(userId) {
    return await Notification.find({
      userId,
      $or: [{ active: true }, { active: { $exists: false } }],
    })
      .populate("senderId", "name email")
      .populate("clothingId", "title media")
      .populate("matchId")
      .sort({ createdAt: -1 });
  }

  async getUnreadCount(userId) {
    return await Notification.countDocuments({
      userId,
      read: false,
      $or: [{ active: true }, { active: { $exists: false } }],
    });
  }

  async markAsRead(userId, notificationId) {
    return await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { read: true },
      { new: true },
    );
  }

  async markAllAsRead(userId) {
    return await Notification.updateMany(
      { userId, read: false },
      { read: true },
    );
  }

  async clearReadNotifications(userId) {
    return await Notification.updateMany(
      { userId, read: true },
      { active: false },
    );
  }
}

export default new NotificationService();
