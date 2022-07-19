import { Banner } from "components/icons";
import styled from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";
export type StageHeaderStyleProps = {};

export const StageHeaderStyle = styled.div`
  display: flex;
  ${FlexGap({ gap: "16px", direction: "row" })}
  padding-left:69px;
  width: 100%;
`;
export const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  ${FlexGap({ gap: "8px", direction: "column" })}
  width:100%;
`;
export const Title = styled.div`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 43px;
  font-feature-settings: "palt" on;

  /* GRAY_100 */

  color: #242a3d;

  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;
export const Progress = styled.div`
  position: relative;
  height: 8px;
  margin-right: 32px;
`;
export const ProgressGray = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-color: #d7dae4;
`;
export const ProgressBlue = styled.div<{ progress: string }>`
  ${({ progress }) => `width: ${progress}`};
  height: 8px;
  border-radius: 4px;
  background-color: #6675fc;
  transition: 0.5s;
`;

export const GoalBanner = styled(Banner)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(100%, -100%);
`;

export const TextProgress = styled.div`
  position: absolute;
  top: 0;
  right: 8px;
  transform: translate(0, -100%);
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  font-feature-settings: "palt" on;

  /* GRAY_100 */

  color: #242a3d;
`;
