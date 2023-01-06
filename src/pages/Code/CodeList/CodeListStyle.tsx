import { Setting } from "components/icons";
import styled from "styled-components";
import { GRAY_100 } from "styles/colors";
import { FONT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";
import React from "react";
export const CodeListStyle = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 128px 204px 0 204px;
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  ${FlexGap({ gap: "36px" })}
`;

export const Title = styled.div`
  height: 25px;
  display: flex;
  ${FlexGap({ gap: "32px" })}
  align-items:center;
  padding-bottom: 29px;
`;
export const TitleLabel = styled.div`
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 30px;
  font-feature-settings: "palt" on;

  color: #2a2c33;
  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;
export const Discription = styled.div`
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;

  color: #2a2c33;
`;

export const RobotList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 378px);
  overflow: auto;
`;
export const SettingIcon: React.FC = () => (
  <Setting display="block" fill={GRAY_100} wrapper="svg" />
);
