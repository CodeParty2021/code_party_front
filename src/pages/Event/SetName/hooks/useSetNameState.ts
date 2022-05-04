import { RefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";

export type IResponse = {
  nameInputRef: RefObject<HTMLInputElement>;
  startBtnHandler: () => void;
};

export const useSetNameState = (): IResponse => {
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const _changeNameHandler = () => {
    nameInputRef.current;
    // TODO: 名前の変更処理を入れる
    console.log(nameInputRef.current?.value);
    navigate("/event/select-mode");
  };
  return {
    nameInputRef,
    startBtnHandler: _changeNameHandler,
  };
};
