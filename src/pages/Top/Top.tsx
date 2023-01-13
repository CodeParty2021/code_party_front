import React from "react";
import { Button } from "components/Button/Button";
import { Background } from "./components/Background";
import { useTopState } from "./hooks/useTopState";
import { ButtonBox, CenterBox, LogoStyle, TopStyle } from "./TopStyle";

type Prop = {};

export const Top: React.FC<Prop> = () => {
  const {
    FirstLoginBtnDisabled,
    FirstLoginBtnHandler,
    NormalLoginBtnDisabled,
    NormalLoginBtnHandler,
    CreateUserBtnDisabled,
    CreateUserBtnHandler,
  } = useTopState();
  return (
    <>
      <TopStyle>
        <CenterBox>
          <LogoStyle src="./logo.svg" />
          <ButtonBox>
            <Button
              color="pink"
              icon={null}
              onClick={FirstLoginBtnHandler}
              size="L"
              status={FirstLoginBtnDisabled ? "disabled" : "default"}
              value="初めて遊ぶ！"
            />
            <Button
              color="blue"
              icon={null}
              onClick={NormalLoginBtnHandler}
              size="M"
              status={NormalLoginBtnDisabled ? "disabled" : "default"}
              value="ログインして遊ぶ！"
            />
            <Button
              color="black"
              icon={null}
              onClick={CreateUserBtnHandler}
              size="S"
              status={CreateUserBtnDisabled ? "disabled" : "default"}
              value="新しくアカウントを作る"
            />
          </ButtonBox>
        </CenterBox>
      </TopStyle>
      <Background />
    </>
  );
};
