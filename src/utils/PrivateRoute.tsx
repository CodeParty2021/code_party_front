import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";

function PrivateOutlet() {
  const { isLogin } = useSelector((state: RootState) => state.user);
  return isLogin ? <Outlet /> : <Navigate to="/start" />;
}
export default PrivateOutlet;
