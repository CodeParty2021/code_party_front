import styled from "styled-components";
import { descriptionPanel } from "styles/colors";
import { FlexGap } from "styles/FlexGap/FlexGap";
export type StepHeaderStyleProps = {};

export const StepHeaderStyle = styled.div`
  display: flex;
  ${FlexGap({ gap: "24px", direction: "row" })}
  justify-content: space-between;
  width: 100%;
`;
export const ButtonBox = styled.div`
  display: flex;
  ${FlexGap({ gap: "8px", direction: "row" })}
`;
export const Step = styled.div`
  font-family: "851Gkktt";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 100%;
  /* identical to box height, or 40px */

  color: ${descriptionPanel.stepHeader.stepColor};
`;

export const TextBox = styled.div`
  display: flex;
  ${FlexGap({ gap: "24px", direction: "row" })}
  flex-direction: row;
  align-items: center;
`;
export const Title = styled.div`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  font-feature-settings: "palt" on;

  color: ${descriptionPanel.stepHeader.titleColor};

  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;
