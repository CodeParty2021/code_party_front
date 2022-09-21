import React from "react";
import { Button } from "components/Button/Button";
import { Background } from "./components/Background";
import { useTopState } from "./hooks/useTopState";
import { useLoginTopState } from "./hooks/useTopState";
import { ButtonBox, CenterBox, LogoStyle, TopStyle } from "./TopStyle";

type Prop = {};

export const Top: React.FC<Prop> = () => {
  const { anonymousLoginBtnDisabled, anonymousLoginBtnHandler } = useTopState();
  const { anonymousLoginBtnDisabled2, anonymousLoginBtnHandler2 } = useLoginTopState();
  return (
    <>
      <TopStyle>
        <CenterBox>
          <LogoStyle src="./logo.svg" />
          <ButtonBox>
            <Button
              color="pink"
              icon={null}
              onClick={anonymousLoginBtnHandler}
              size="L"
              status={anonymousLoginBtnDisabled ? "disabled" : "default"}
              value="初めて遊ぶ！"
            />
          </ButtonBox>
          <ButtonBox>
            <Button
              color="blue"
              icon={null}
              onClick={anonymousLoginBtnHandler2}
              size="M"
              status={anonymousLoginBtnDisabled2 ? "disabled" : "default"}
              value="ログインしてスタート！"
            />
          </ButtonBox>
        </CenterBox>
      </TopStyle>
      <Background />
    </>
  );
};
