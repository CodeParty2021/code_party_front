import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Message } from "./Message";
import { LogPanel } from "../LogPanel/LogPanel";

export default {
  title: "components/Message",
  component: Message,
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => (
  <Message {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "タイトル",
  value: "メッセージ",
  color: "blue",
};
