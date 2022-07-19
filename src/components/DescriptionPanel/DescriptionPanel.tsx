import { DescriptionCMSType } from "hooks/DescriptionCMSHooks/useDescriptionCMS";
import React from "react";
import { CMSRenderer } from "./components/CMSRender/CMSRenderer";
import { StageHeader } from "./components/StageHeader/StageHeader";
import { StepHeader } from "./components/StepHeader/StepHeader";
import {
  Blur,
  BlurBox,
  Body,
  DescriptionPanelStyle,
  DescriptionPanelStyleProps,
  Header,
} from "./DescriptionPanelStyle";

type Props = DescriptionPanelStyleProps & {
  stage: number;
  workingStep: number;
  completeStep: number;
  maxStep: number;
  description: DescriptionCMSType;
  title: string;
};

export const DescriptionPanel: React.FC<Props> = ({
  workingStep,
  completeStep,
  maxStep,
  description,
  title,
  stage,
  ...styleProps
}) => {
  return (
    <DescriptionPanelStyle {...styleProps}>
      <Header>
        <StageHeader
          stage={stage}
          workingStep={workingStep}
          completeStep={completeStep}
          maxStep={maxStep}
        />
        <StepHeader step={workingStep} maxStep={maxStep} title={title} />
      </Header>
      <Body>
        <CMSRenderer description={description} />
      </Body>
      <BlurBox>
        <Blur />
      </BlurBox>
    </DescriptionPanelStyle>
  );
};
