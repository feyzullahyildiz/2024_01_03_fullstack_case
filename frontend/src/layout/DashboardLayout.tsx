import React, { ReactNode } from "react";
import { Button, Layout } from "antd";
import { useUser } from "../hooks";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  color: "#fff",
  height: 64,
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "flex-end",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  flex: 1,
  color: "#fff",
};

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

interface Props {
  children: ReactNode;
}
export const DashboardLayout: React.FC<Props> = ({ children }) => {
  const user = useUser();

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        {user.name}
        <Link to="/logout">
          <Button>Logout</Button>
        </Link>
      </Header>
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  );
};
