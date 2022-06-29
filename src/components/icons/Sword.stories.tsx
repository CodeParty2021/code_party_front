import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Sword } from "./index";

export default {
  title: "Icons/Sword",
  component: Sword,
} as ComponentMeta<typeof Sword>;

const Template: ComponentStory<typeof Sword> = (args) => <Sword {...args} />;

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
