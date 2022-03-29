import { useSelector } from "react-redux";
import { RootState } from "store";

export type IResponse = {
  anonymousLoginFormDisplay: boolean;
  firebaseLoginFormDisplay: boolean;
};

export const useStartState = (): IResponse => {
  const { isLogin } = useSelector((state: RootState) => state.user);

  return {
    anonymousLoginFormDisplay: !isLogin,
    firebaseLoginFormDisplay: true,
  };
};
