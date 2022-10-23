import { useNavigate } from "react-router-dom";

export type IResponse = {
  beginDevelopHandler: () => void;
  beginRoomBattleHandler: () => void;
};

export const useSelectModeState = (): IResponse => {
  const navigate = useNavigate();

  //該当ステップにユーザのコードが存在していればそれをロードするなければ新しく作ってそれをロードする
  const _beginDevelopHandler = () => {
    navigate(`/robot-development/top`);
  };

  const _beginRoomBattleHandler = () => {
    navigate("/room-match/top");
  };

  return {
    beginDevelopHandler: _beginDevelopHandler,
    beginRoomBattleHandler: _beginRoomBattleHandler,
  };
};
