import React from "react";
import { Button } from "components/Button/Button";
import { Background } from "./components/Background";
import { useFisrtLoginTopState } from "./hooks/useTopState";
import { useNormalLoginTopState } from "./hooks/useTopState";
import { ButtonBox, CenterBox, LogoStyle, TopStyle } from "./TopStyle";

type Prop = {};

export const Top: React.FC<Prop> = () => {
  const { FirstLoginBtnDisabled, FirstLoginBtnHandler } = useFisrtLoginTopState();
  const { NormalLoginBtnDisabled, NormalLoginBtnHandler } = useNormalLoginTopState();
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
              value="ログインしてスタート！"
            />
          </ButtonBox>
        </CenterBox>
      </TopStyle>
      <Background />
    </>
  );
};
