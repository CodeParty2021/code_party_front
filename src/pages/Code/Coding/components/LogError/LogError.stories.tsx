import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LogError } from "./LogError";
import { LogPanel } from "../LogPanel/LogPanel";

export default {
  title: "components/LogError",
  component: LogError,
} as ComponentMeta<typeof LogError>;

const Template: ComponentStory<typeof LogError> = (args) => (
  <LogPanel state="log">
    <LogError {...args} />
  </LogPanel>
);

export const Default = Template.bind({});
Default.args = {};
