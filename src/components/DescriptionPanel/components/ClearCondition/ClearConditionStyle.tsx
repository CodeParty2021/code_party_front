import React from "react";
import styled from "styled-components";
import ClearConditionTitleBar from "./ClearConditionTitleBar.svg";
import ClearConditionRB from "./ClearConditionRB.svg";
import { CheckCircle } from "components/icons";
import { FlexGap } from "styles/FlexGap/FlexGap";
import { descriptionPanel } from "styles/colors";
export type ClearConditionStyleProps = {};

export const ClearConditionStyle = styled.div<ClearConditionStyleProps>`
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 24px 16px;
  gap: 16px;
  isolation: isolate;

  width: 100%;

  /* GRAY_00 */

  background: ${descriptionPanel.clearCondition.background};
  /* BLUE_50 */

  border: 2px solid ${descriptionPanel.clearCondition.border};
  border-radius: 8px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  position: relative;
`;

export const TitleBar: React.FC<{}> = () => (
  <TitleBarStyle>
    <img
      src={ClearConditionTitleBar}
      style={{ position: "absolute", userSelect: "none", display: "block" }}
    />
    <TitleText>クリア条件</TitleText>
  </TitleBarStyle>
);

const TitleBarStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const TitleText = styled.div`
  position: relative;
  left: 20px;
  top: 1px;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;

  font-feature-settings: "palt" on;

  color: ${descriptionPanel.clearCondition.titleColor};

  transform: matrix(0.99, 0, -0.1, 1, 0, 0);

  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`;
export const Text = styled.div`
  width: 100%;
  overflow-wrap: break-word;

  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;

  color: ${descriptionPanel.clearCondition.conditionColor};

  flex: none;
  order: 1;
  flex-grow: 0;
`;
export const RBEdge = () => (
  <img
    src={ClearConditionRB}
    style={{
      position: "absolute",
      right: 0,
      bottom: 0,
      zIndex: 1,
      userSelect: "none",
      display: "block",
    }}
  />
);

export const State: React.FC<{ state: boolean }> = ({ state }) =>
  state ? (
    <CheckCircleBlock fill={descriptionPanel.clearCondition.notCleared} />
  ) : (
    <CheckCircleBlock fill={descriptionPanel.clearCondition.cleared} />
  );

const CheckCircleBlock = styled(CheckCircle)`
  display: flex;
`;

export const Condition = styled.div`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;

  display: flex;
  ${FlexGap({ gap: "16px", direction: "column" })}
  align-items: center;

  color: ${descriptionPanel.clearCondition.conditionColor};
`;
