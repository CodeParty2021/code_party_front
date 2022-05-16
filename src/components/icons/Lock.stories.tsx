import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Lock } from "./index";

export default {
  title: "Icons/Lock",
  component: Lock,
} as ComponentMeta<typeof Lock>;

const Template: ComponentStory<typeof Lock> = (args) => <Lock {...args} />;

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
