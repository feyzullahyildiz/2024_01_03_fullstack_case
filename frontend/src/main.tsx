import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { NotificatinProvider } from "./provider/NotificatinProvider.tsx";
import { ConfigProvider, theme } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <NotificatinProvider>
          <RouterProvider router={router} />
        </NotificatinProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
