import { DashboardLayout } from "../../layout/DashboardLayout";

import styles from "./style.module.css";
import { Outlet } from "react-router-dom";

export const DashboardPage = () => {


  return (
    <DashboardLayout>
      <div className={styles.container}>
        <Outlet />
      </div>
    </DashboardLayout>
  );
};
