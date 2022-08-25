import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckCircle } from "./index";

export default {
  title: "Icons/CheckCircle",
  component: CheckCircle,
} as ComponentMeta<typeof CheckCircle>;

const Template: ComponentStory<typeof CheckCircle> = (args) => (
  <CheckCircle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  display: "inline-block",
  wrapper: "svg",
  fill: "#252525",
};

export const Orange = Template.bind({});
Orange.args = {
  ...Default.args,
  fill: "#FF5500",
};
