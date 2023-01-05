import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";
import { Times } from "components/icons";

export default {
  title: "components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "black",
  size: "M",
  status: "default",
  icon: null,
  value: "Button",
};

export const LargeBlue = Template.bind({});
LargeBlue.args = {
  ...Default.args,
  color: "blue",
  size: "L",
};

export const MediumPink = Template.bind({});
MediumPink.args = {
  ...Default.args,
  color: "pink",
  size: "M",
};

export const SmallGreen = Template.bind({});
SmallGreen.args = {
  ...Default.args,
  color: "green",
  size: "S",
};

export const IconWhite = Template.bind({});
IconWhite.args = {
  ...Default.args,
  color: "white",
  size: "S",
  icon: "left",
  Icon: Times,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  status: "disabled",
};
