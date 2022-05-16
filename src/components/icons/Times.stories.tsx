import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Times } from "./index";

export default {
  title: "Icons/Times",
  component: Times,
} as ComponentMeta<typeof Times>;

const Template: ComponentStory<typeof Times> = (args) => <Times {...args} />;

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
