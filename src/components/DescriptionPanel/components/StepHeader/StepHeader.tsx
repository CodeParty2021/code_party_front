import { RoundedButton } from "components/RoundedButton/RoundedButton";
import React from "react";
import {
  ButtonBox,
  Step,
  StepHeaderStyle,
  StepHeaderStyleProps,
  TextBox,
  Title,
} from "./StepHeaderStyle";

type Props = StepHeaderStyleProps & {
  step: number;
  maxStep: number;
  title: string;
};
export const StepHeader: React.FC<Props> = ({
  step,
  maxStep,
  title,
  ...styleProps
}) => {
  return (
    <StepHeaderStyle {...styleProps}>
      <TextBox>
        <Step>Step {step}</Step>
        <Title>{title}</Title>
      </TextBox>
      <ButtonBox>
        <RoundedButton
          icon="left"
          onClick={() => {}}
          value="前へ"
          disabled={step === 1}
        />
        <RoundedButton
          icon="right"
          onClick={() => {}}
          value="次へ"
          disabled={step === maxStep}
        />
      </ButtonBox>
    </StepHeaderStyle>
  );
};
