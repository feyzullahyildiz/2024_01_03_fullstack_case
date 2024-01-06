import { useContext } from "react";
import { NotificationContext } from "../provider/NotificatinProvider";

export const useNotificationApi = () => useContext(NotificationContext);
