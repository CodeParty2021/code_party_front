import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StarBackground } from "./StarBackground";

export default {
  title: "components/StarBackground",
  component: StarBackground,
} as ComponentMeta<typeof StarBackground>;

const Template: ComponentStory<typeof StarBackground> = (args) => (
  <div style={{ width: "1920px", height: "1080px" }}>
    <StarBackground {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
