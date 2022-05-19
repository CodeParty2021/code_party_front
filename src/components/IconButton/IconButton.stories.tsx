import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconButton } from "./IconButton";
import { ArrowLeft } from "components/icons";

export default {
  title: "components/IconButton",
  component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  Icon: ArrowLeft,
};
