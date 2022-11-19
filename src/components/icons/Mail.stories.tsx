import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Mail } from "./index";

export default {
  title: "Icons/Mail",
  component: Mail,
} as ComponentMeta<typeof Mail>;

const Template: ComponentStory<typeof Mail> = (args) => <Mail {...args} />;

export const Default = Template.bind({});
Default.args = {
  display: "inline-block",
  wrapper: "svg",
  fill: "#252525",
};
