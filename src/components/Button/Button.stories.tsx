import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: "black",
  size: "M",
  status: "default",
  icon: "null",
  value: "Button",
};

export const LargeBlue = Template.bind({});
LargeBlue.args = {
  ...Default.args,
  color: "blue",
  size: "L",
};

export const SmallPink = Template.bind({});
SmallPink.args = {
  ...Default.args,
  color: "pink",
  size: "S",
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  status: "disabled",
};