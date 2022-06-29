import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TriangleBottom } from "./index";

export default {
  title: "Icons/TriangleBottom",
  component: TriangleBottom,
} as ComponentMeta<typeof TriangleBottom>;

const Template: ComponentStory<typeof TriangleBottom> = (args) => (
  <TriangleBottom {...args} />
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
