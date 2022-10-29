import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Avatar } from "./Avatar";

export default {
  title: "components/Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  userPhotoUrl: undefined,
  color: "default",
  type: "user",
};

export const Turquoise = Template.bind({});
Turquoise.args = {
  ...Default.args,
  color: "turquoise",
};

export const Leaf = Template.bind({});
Leaf.args = {
  ...Default.args,
  color: "leaf",
};

export const Orange = Template.bind({});
Orange.args = {
  ...Default.args,
  color: "orange",
};

export const Pink = Template.bind({});
Pink.args = {
  ...Default.args,
  color: "pink",
};

export const HasIcon = Template.bind({});
HasIcon.args = {
  ...Default.args,
  userPhotoUrl: "/logo192.png",
};

export const User = Template.bind({});
User.args = {
  ...Default.args,
  type: "user",
};

export const Anonymous = Template.bind({});
Anonymous.args = {
  ...Default.args,
  type: "anonymous",
};

export const Robot = Template.bind({});
Robot.args = {
  ...Default.args,
  type: "robot",
};
