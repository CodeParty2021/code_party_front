import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RobotLink } from "./RobotLink";

export default {
  title: "components/Event/SelectAI/RobotLink",
  component: RobotLink,
} as ComponentMeta<typeof RobotLink>;

const Template: ComponentStory<typeof RobotLink> = (args) => (
  <RobotLink {...args} />
);

export const One = Template.bind({});
One.args = {
  number: 1,
  label: "aaaaa",
};

export const Two = Template.bind({});
Two.args = {
  number: 2,
  label: "hogehoge",
};
