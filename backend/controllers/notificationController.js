import notificationService from "../services/notificationService.js";

const getMyNotifications = async (req, res) => {
  try {
    const userId = req.loggerUser.id;

    const notifications =
      await notificationService.getUserNotifications(userId);
    const unreadCount = await notificationService.getUnreadCount(userId);

    return res.status(200).json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao buscar notificações" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const userId = req.loggerUser.id;
    const { notificationId } = req.params;

    const notification = await notificationService.markAsRead(
      userId,
      notificationId,
    );

    if (!notification) {
      return res.status(404).json({ error: "Notificação não encontrada" });
    }

    return res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro ao marcar notificação como lida" });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const userId = req.loggerUser.id;

    await notificationService.markAllAsRead(userId);

    return res.status(200).json({
      message: "Todas as notificações foram marcadas como lidas",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro ao marcar notificações como lidas" });
  }
};

const clearReadNotifications = async (req, res) => {
  try {
    const userId = req.loggerUser.id;

    await notificationService.clearReadNotifications(userId);

    return res.status(200).json({
      message: "Notificações lidas foram limpas",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao limpar notificações lidas" });
  }
};

export default {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  clearReadNotifications,
};
