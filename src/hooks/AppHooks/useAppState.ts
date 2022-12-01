import { useIsCloseCMS } from "hooks/IsCloseCMSHooks/isCloseCMS";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCallBackToSyncUser } from "services/user/user";
import { RootState } from "store";

type IResponse = {
  isLoading: boolean;
  isClose: boolean;
  isDev: boolean;
};
export const useAppState = (): IResponse => {
  const unRegisterObserver = useSelector(
    (state: RootState) => state.user.unRegisterObserver
  );
  const [isClose, setIsClose] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const isDev = process.env.NODE_ENV === "development";
  const { getIsClose } = useIsCloseCMS();
  useEffect(() => {
    const func = async () => {
      setIsLoading(true);
      // ログイン監視リスナーをセット
      dispatch(setCallBackToSyncUser());
      const isCloseResult = await getIsClose();
      setIsClose(isCloseResult);
      setIsLoading(false);
      return () => {
        // ページリロードやページから出るときにリスナーを削除
        if (unRegisterObserver) unRegisterObserver();
      };
    };
    func();
  }, []);
  return {
    isLoading,
    isClose,
    isDev,
  };
};
