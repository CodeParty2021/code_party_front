import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StarBackground } from "./StarBackground";

export default {
  title: "components/StarBackground",
  component: StarBackground,
} as ComponentMeta<typeof StarBackground>;

const Template: ComponentStory<typeof StarBackground> = (args) => (
  <StarBackground {...args} />
);

export const Default = Template.bind({});
Default.args = {};
