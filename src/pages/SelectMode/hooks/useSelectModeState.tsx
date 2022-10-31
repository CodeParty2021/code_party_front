import { useNavigate } from "react-router-dom";

export type IResponse = {
  beginDevelopHandler: () => void;
  beginRoomMatchHandler: () => void;
};

export const useSelectModeState = (): IResponse => {
  const navigate = useNavigate();

  //該当ステップにユーザのコードが存在していればそれをロードするなければ新しく作ってそれをロードする
  const _beginDevelopHandler = () => {
    navigate(`/robot-development/top`);
  };

  const _beginRoomMatchHandler = () => {
    navigate("/room-match");
  };

  return {
    beginDevelopHandler: _beginDevelopHandler,
    beginRoomMatchHandler: _beginRoomMatchHandler,
  };
};
