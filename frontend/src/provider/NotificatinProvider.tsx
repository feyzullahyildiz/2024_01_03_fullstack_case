import React from "react";
import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

export const NotificationContext = React.createContext<NotificationInstance>(
  null!
);
interface Props {
  children: React.ReactNode;
}
export const NotificatinProvider: React.FC<Props> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <NotificationContext.Provider value={api}>
      {contextHolder} {children}
    </NotificationContext.Provider>
  );
};
