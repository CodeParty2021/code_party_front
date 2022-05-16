import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ArrowLeft } from "./index";

export default {
  title: "Icons/ArrowLeft",
  component: ArrowLeft,
} as ComponentMeta<typeof ArrowLeft>;

const Template: ComponentStory<typeof ArrowLeft> = (args) => (
  <ArrowLeft {...args} />
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
