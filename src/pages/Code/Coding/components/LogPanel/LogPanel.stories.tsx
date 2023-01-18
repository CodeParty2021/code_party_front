import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LogPanel } from "./LogPanel";

export default {
  title: "components/LogPanel",
  component: LogPanel,
} as ComponentMeta<typeof LogPanel>;

const Template: ComponentStory<typeof LogPanel> = (args) => (
  <LogPanel {...args} />
);

export const Default = Template.bind({});
Default.args = {state:"log"};
