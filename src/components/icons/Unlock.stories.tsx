import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Unlock } from "./index";

export default {
  title: "Icons/Unlock",
  component: Unlock,
} as ComponentMeta<typeof Unlock>;

const Template: ComponentStory<typeof Unlock> = (args) => <Unlock {...args} />;

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
