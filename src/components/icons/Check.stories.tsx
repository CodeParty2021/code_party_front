import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Check } from "./index";

export default {
  title: "Icons/Check",
  component: Check,
} as ComponentMeta<typeof Check>;

const Template: ComponentStory<typeof Check> = (args) => <Check {...args} />;

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
