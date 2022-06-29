import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LogItem } from "./LogItem";
import { LogPanel } from "../LogPanel/LogPanel";

export default {
  title: "components/LogItem",
  component: LogItem,
} as ComponentMeta<typeof LogItem>;

const Template: ComponentStory<typeof LogItem> = (args) => (
  <LogPanel>
    <LogItem {...args} />
  </LogPanel>
);

export const Default = Template.bind({});
Default.args = {
  turnNum: 1,
  log: "１行目のログです。",
};
