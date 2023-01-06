import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Google } from "./index";

export default {
  title: "Icons/Google",
  component: Google,
} as ComponentMeta<typeof Google>;

const Template: ComponentStory<typeof Google> = (args) => <Google {...args} />;

export const Default = Template.bind({});
Default.args = {
  display: "inline-block",
  wrapper: "svg",
  fill: "#252525",
};
