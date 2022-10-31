import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AlgoHead } from "./AlgoHead";

export default {
  title: "components/AlgoHead",
  component: AlgoHead,
} as ComponentMeta<typeof AlgoHead>;

const Template: ComponentStory<typeof AlgoHead> = (args) => (
  <AlgoHead {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: "turquoise",
  width: "142px",
  height: "118px",
};
