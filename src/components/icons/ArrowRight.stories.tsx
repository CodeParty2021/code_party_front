import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ArrowRight } from "./index";

export default {
  title: "Icons/ArrowRight",
  component: ArrowRight,
} as ComponentMeta<typeof ArrowRight>;

const Template: ComponentStory<typeof ArrowRight> = (args) => (
  <ArrowRight {...args} />
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
