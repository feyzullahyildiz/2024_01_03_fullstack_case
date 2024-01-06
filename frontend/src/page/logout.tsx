import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { actionLogout } from "../redux/me/meSlice";

export const LogoutPage = () => {
  const user = useAppSelector((state) => state.me.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actionLogout());
  }, [dispatch]);
  if (user) {
    return null;
  }
  return <Navigate to="/login" />;
};
