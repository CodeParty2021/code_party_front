import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconCircle } from "./IconCircle";
import { Plus } from "components/icons";

export default {
  title: "components/IconCircle",
  component: IconCircle,
} as ComponentMeta<typeof IconCircle>;

const Template: ComponentStory<typeof IconCircle> = (args) => (
  <IconCircle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  Icon: Plus,
};
