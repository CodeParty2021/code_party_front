import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ClearCondition } from "./ClearCondition";

export default {
  title: "components/DescriptionPanel/ClearCondition",
  component: ClearCondition,
} as ComponentMeta<typeof ClearCondition>;

const Template: ComponentStory<typeof ClearCondition> = (args) => (
  <ClearCondition {...args} />
);

export const Default = Template.bind({});
Default.args = {
  conditions: [
    "1. 右へ直進して、スタートからゴールまで進む。",
    "2. 右へ直進して、スタートからゴールまで進む。",
  ],
  states: [true, false],
};
