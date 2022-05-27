import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tab } from "./Tab";

export default {
  title: "components/Tab",
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "LOG",
};
