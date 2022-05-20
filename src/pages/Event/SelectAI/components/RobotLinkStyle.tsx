import { Algo } from "components/Character/Algo/Algo";
import { MissionNumber } from "components/MissionNumber/MissionNumber";
import styled from "styled-components";
import { GRAY_10, GRAY_20 } from "styles/colors";
import { FONT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export const RobotLinkStyle = styled.div`
  height: 400px;
  width: 378px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${GRAY_10};
  border: 1px solid ${GRAY_20};
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Label = styled.div`
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  font-feature-settings: "palt" on;

  color: #2a2c33;

  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;
export const RobotImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 10px;

  width: 378px;
  height: 252px;
`;
export const Frame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  ${FlexGap({ gap: "35px" })}

  width: 314px;
  height: 188px;

  background: #35c4d4;
  border-radius: 32px;

  position: relative;
`;
export const Filter1 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  background-color: black;
  border-radius: 32px;
`;
export const Filter2 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-color: white;
  border-radius: 32px;
`;
export const MissionNumberFront = styled(MissionNumber)`
  z-index: 10;
`;
export const AlgoFront = styled(Algo)`
  z-index: 10;
`;
