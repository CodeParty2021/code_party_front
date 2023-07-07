import { Algo } from "components/Character/Algo/Algo";
import { IconCircle } from "components/IconCircle/IconCircle";
import { Plus } from "components/icons";
import React from "react";
import styled from "styled-components";
import { GRAY_10, GRAY_100, GRAY_20 } from "styles/colors";
import { FONT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

type Props = {
  newCodeButtonHandler: () => void;
};

const RobotLinkStyle = styled.div`
  width: 378px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${GRAY_10};
  border: 1px solid ${GRAY_20};
  &:hover {
    background-color: #f0f0f0;
  }
  padding: 32px 32px 107px 32px;
  ${FlexGap({ gap: "35px" })}
`;

const Label = styled.div`
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  font-feature-settings: "palt" on;

  color: #2a2c33;

  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;

const RobotImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 10px;

  width: 378px;
  height: 252px;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  ${FlexGap({ gap: "35px" })}

  width: 314px;
  height: 188px;

  background: ${GRAY_100};
  border-radius: 32px;

  position: relative;
`;

const PlusIcon = styled(IconCircle)`
  z-index: 10;
`;

const AlgoFront = styled(Algo)`
  z-index: 10;
`;

export const CreateCodeCard: React.FC<Props> = (props: Props) => {
  return (
    <RobotLinkStyle onClick={props.newCodeButtonHandler}>
      <RobotImage>
        <Frame>
          <PlusIcon Icon={Plus} />
          <AlgoFront color="leaf" />
        </Frame>
      </RobotImage>
      <Label>{"新しくロボットをプログラミングする"}</Label>
    </RobotLinkStyle>
  );
};
