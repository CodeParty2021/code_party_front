import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StageHeader } from "./StageHeader";

export default {
  title: "components/DescriptionPanel/StageHeader",
  component: StageHeader,
} as ComponentMeta<typeof StageHeader>;

const Template: ComponentStory<typeof StageHeader & { children: any }> = (
  args
) => <StageHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  stage: 1,
  completeStep: 0,
  maxStep: 3,
  workingStep: 1,
};
