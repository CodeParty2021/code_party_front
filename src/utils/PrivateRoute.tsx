import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  component: React.ComponentType;
  redirectUrl?: string;
};

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  redirectUrl, // していなければstartページに遷移する
}) => {
  const { isLogin } = useSelector((state: RootState) => state.user);
  if (isLogin) {
    return <RouteComponent />;
  } else {
    return <Navigate to={redirectUrl || "/start"} />;
  }
};
