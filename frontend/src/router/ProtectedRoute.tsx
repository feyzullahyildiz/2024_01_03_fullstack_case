import React, { ReactNode, useEffect } from "react";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { actionMe } from "../redux/me/meApi";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}
export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actionMe());
  }, [dispatch]);
  const state = useAppSelector((state) => state.me);
  if (state.isLoading) {
    return <Spin />;
  }
  if (state.isFailed) {
    return <Navigate to="/login" />;
  }
  if (state.isSuccess) {
    return children;
  }
  return null;
};

