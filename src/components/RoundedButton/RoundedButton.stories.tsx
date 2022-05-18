import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RoundedButton } from "./RoundedButton";

export default {
  title: "components/RoundedButton",
  component: RoundedButton,
} as ComponentMeta<typeof RoundedButton>;

const Template: ComponentStory<typeof RoundedButton> = (args) => (
  <RoundedButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: "次へ",
  disabled: false,
  icon: null,
};
