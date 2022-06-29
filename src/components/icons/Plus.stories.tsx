import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Plus } from "./index";

export default {
  title: "Icons/Plus",
  component: Plus,
} as ComponentMeta<typeof Plus>;

const Template: ComponentStory<typeof Plus> = (args) => <Plus {...args} />;

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
