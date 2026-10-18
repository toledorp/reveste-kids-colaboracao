import express from "express";
import notificationController from "../controllers/notificationController.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

router.get(
  "/notifications",
  Auth.Authorization,
  notificationController.getMyNotifications
);

router.patch(
  "/notifications/:notificationId/read",
  Auth.Authorization,
  notificationController.markAsRead
);

router.patch(
  "/notifications/read-all",
  Auth.Authorization,
  notificationController.markAllAsRead
);

router.patch(
  "/notifications/clear-read",
  Auth.Authorization,
  notificationController.clearReadNotifications
);

export default router;