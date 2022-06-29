import { Button } from "components/Button/Button";
import React from "react";
import { Background } from "../components/Background";
import { useTopState } from "./hooks/useTopState";
import { ButtonBox, CenterBox, LogoStyle, TopStyle } from "./TopStyle";

type Props = {};

export const EventTop: React.FC<Props> = () => {
  const { anonymousLoginBtnDisabled, anonymousLoginBtnHandler } = useTopState();
  return (
    <>
      <TopStyle>
        <CenterBox>
          <LogoStyle src="./logo454.png" />
          <ButtonBox>
            <Button
              color="pink"
              icon={null}
              onClick={anonymousLoginBtnHandler}
              size="L"
              status={anonymousLoginBtnDisabled ? "disabled" : "default"}
              value="いざスタート！"
            />
          </ButtonBox>
        </CenterBox>
      </TopStyle>
      <Background />
    </>
  );
};
