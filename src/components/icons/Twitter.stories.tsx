import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Twitter } from "./index";

export default {
  title: "Icons/Twitter",
  component: Twitter,
} as ComponentMeta<typeof Twitter>;

const Template: ComponentStory<typeof Twitter> = (args) => (
  <Twitter {...args} />
);

export const Default = Template.bind({});
Default.args = {
  display: "inline-block",
  wrapper: "svg",
  fill: "#252525",
};
