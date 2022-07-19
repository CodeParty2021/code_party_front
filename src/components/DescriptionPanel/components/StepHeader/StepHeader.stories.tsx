import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StepHeader } from "./StepHeader";

export default {
  title: "components/DescriptionPanel/StepHeader",
  component: StepHeader,
} as ComponentMeta<typeof StepHeader>;

const Template: ComponentStory<typeof StepHeader & { children: any }> = (
  args
) => <StepHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  step: 1,
  maxStep: 3,
  title: "チュートリアル",
};
