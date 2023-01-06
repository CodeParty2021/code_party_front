import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Facebook } from "./index";

export default {
  title: "Icons/Facebook",
  component: Facebook,
} as ComponentMeta<typeof Facebook>;

const Template: ComponentStory<typeof Facebook> = (args) => (
  <Facebook {...args} />
);

export const Default = Template.bind({});
Default.args = {
  display: "inline-block",
  wrapper: "svg",
  fill: "#252525",
};
