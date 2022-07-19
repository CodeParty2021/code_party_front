import React from "react";
import styled from "styled-components";
import ClearConditionTitleBar from "./ClearConditionTitleBar.svg";
import ClearConditionRB from "./ClearConditionRB.svg";
import { CheckCircle } from "components/icons";
import { FlexGap } from "styles/FlexGap/FlexGap";
export type ClearConditionStyleProps = {};

export const ClearConditionStyle = styled.div<ClearConditionStyleProps>`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 24px 16px;
  gap: 16px;
  isolation: isolate;

  width: 100%;

  /* GRAY_00 */

  background: #fafafa;
  /* BLUE_50 */

  border: 2px solid #6675fc;
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
      style={{ position: "absolute", userSelect: "none" }}
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
  color: #ffffff;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 22px;
  /* identical to box height */

  font-feature-settings: "palt" on;

  /* WHITE */

  color: #ffffff;

  transform: matrix(0.99, 0, -0.1, 1, 0, 0);

  /* Inside auto layout */

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

  color: #242a3d;

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
    }}
  />
);

export const State: React.FC<{ state: boolean }> = ({ state }) =>
  state ? (
    <CheckCircleBlock fill="#30C567;" />
  ) : (
    <CheckCircleBlock fill="#D7DAE4;" />
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

  /* GRAY_100 */

  color: #242a3d;
`;
