import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Checked } from "./index";

export default {
  title: "Icons/Checked",
  component: Checked,
} as ComponentMeta<typeof Checked>;

const Template: ComponentStory<typeof Checked> = (args) => (
  <Checked {...args} />
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
