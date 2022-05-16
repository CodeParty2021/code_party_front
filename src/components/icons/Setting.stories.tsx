import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Setting } from "./index";

export default {
  title: "Icons/Setting",
  component: Setting,
} as ComponentMeta<typeof Setting>;

const Template: ComponentStory<typeof Setting> = (args) => (
  <Setting {...args} />
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
