import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../page/login";
import { DashboardPage } from "../page/dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import { LogoutPage } from "../page/logout";
import { SignupPage } from "../page/signup";
import { ListTasksPage } from "../page/dashboard/component/ListTasksPage";
import { AddTaskPage } from "../page/dashboard/component/AddTaskPage";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <ListTasksPage />,
      },
      {
        path: "/add",
        element: <AddTaskPage />,
      },
    ],
  },
]);
