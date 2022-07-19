import { MissionNumber } from "components/MissionNumber/MissionNumber";
import React from "react";
import {
  GoalBanner,
  Progress,
  ProgressBlue,
  ProgressGray,
  RightBox,
  StageHeaderStyle,
  StageHeaderStyleProps,
  TextProgress,
  Title,
} from "./StageHeaderStyle";

type Props = StageHeaderStyleProps & {
  stage: number;
  workingStep: number;
  completeStep: number;
  maxStep: number;
};
const progress = (step: number, maxstep: number) =>
  (step / maxstep) * 100 + "%";
export const StageHeader: React.FC<Props> = ({
  stage,
  completeStep,
  workingStep,
  maxStep,
  ...styleProps
}) => {
  return (
    <StageHeaderStyle {...styleProps}>
      <MissionNumber number={stage} />
      <RightBox>
        <Title>まっすぐ歩くロボット</Title>
        <Progress>
          <ProgressGray>
            <ProgressBlue progress={progress(completeStep, maxStep)} />
          </ProgressGray>
          <GoalBanner fill="#6675FC" />
          <TextProgress>
            {workingStep}/{maxStep}
          </TextProgress>
        </Progress>
      </RightBox>
    </StageHeaderStyle>
  );
};
