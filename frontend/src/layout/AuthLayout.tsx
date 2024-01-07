import { Card, Flex } from "antd";
import React from "react";

interface Props {
  children?: React.ReactNode;
  title: string;
}
export const AuthLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      <Card title={title}>{children}</Card>
    </Flex>
  );
};
