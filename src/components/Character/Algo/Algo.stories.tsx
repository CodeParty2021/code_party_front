import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Algo } from "./Algo";

export default {
  title: "components/Algo",
  component: Algo,
} as ComponentMeta<typeof Algo>;

const Template: ComponentStory<typeof Algo> = (args) => <Algo {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "turquoise",
};
