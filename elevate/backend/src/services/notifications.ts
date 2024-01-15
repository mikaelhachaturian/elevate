import { Notification } from '../models/notification';

export interface NotificationDetail {
  requestId: string;
  email: string;
  status: string;
}

export const getNotifications = async (email: string) => {
  const notifications = await Notification.findAll({
    where: {
      email: email,
    },
  });

  return notifications.map((n) => ({
    email: n.email,
    requestId: n.requestId,
    status: n.status,
  }));
};

export const createNotification = async (n: NotificationDetail) => {
  const notification = await Notification.create({ ...n });
  return notification;
};

export const getNotification = async (requestId: string) => {
  const n = await Notification.findOne({
    where: {
      requestId: requestId,
    },
  });
  return n;
};

export const deleteAllNotifications = async (email: string) => {
  await Notification.destroy({
    where: {
      email: email,
    },
  });
};
