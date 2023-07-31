import { Button } from "components/Button/Button";
import { Algo } from "components/Character/Algo/Algo";
import { MissionNumber } from "components/MissionNumber/MissionNumber";
import React from "react";
import styled from "styled-components";
import { BLUE_20, GRAY_10, GRAY_20 } from "styles/colors";
import { FONT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

type Props = {
  number: number;
  id: string;
  codeContent: string;
  updatedAt: string;
  deleteHandler: (id: string) => void;
  editHandler: (id: string) => void;
};

const RobotLinkStyle = styled.div`
  width: 378px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${GRAY_10};
  border: 1px solid ${GRAY_20};
  padding: 32px;
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

  background: ${BLUE_20};
  border-radius: 32px;

  position: relative;
`;

const MissionNumberFront = styled(MissionNumber)`
  z-index: 10;
`;

const AlgoFront = styled(Algo)`
  z-index: 10;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  ${FlexGap({ gap: "8px" })}
`;

const MAX_LABEL_LENGTH = 10;
const labelize = (codeContent: string) => {
  const firstLine = codeContent.split("\n")[0];
  if (firstLine.length <= MAX_LABEL_LENGTH) return firstLine;
  return firstLine.substr(0, MAX_LABEL_LENGTH) + "...";
};
export const CodeCard: React.FC<Props> = (props: Props) => {
  return (
    <RobotLinkStyle>
      <RobotImage>
        <Frame>
          <MissionNumberFront number={props.number} />
          <AlgoFront />
        </Frame>
      </RobotImage>
      <Label>{labelize(props.codeContent)}</Label>
      <ButtonBox>
        <Button
          color="blue"
          icon={null}
          onClick={() => props.editHandler(props.id)}
          size="S"
          status="default"
          value="へんしゅう"
        />
        <Button
          color="pink"
          icon={null}
          onClick={() => {
            const res = confirm(
              "本当にさくじょしますか？さくじょしたロボットはもどせません！"
            );
            if (res) props.deleteHandler(props.id);
          }}
          size="S"
          status="default"
          value="さくじょ"
        />
      </ButtonBox>
    </RobotLinkStyle>
  );
};
