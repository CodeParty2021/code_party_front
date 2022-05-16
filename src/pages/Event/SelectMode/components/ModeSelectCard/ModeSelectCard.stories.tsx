import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ModeSelectCard } from "./ModeSelectCard";

export default {
  title: "components/ModeSelectCard",
  component: ModeSelectCard,
} as ComponentMeta<typeof ModeSelectCard>;

const Template: ComponentStory<typeof ModeSelectCard> = (args) => (
  <ModeSelectCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  mode: "solo",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  mode: "battle",
  disabled: true,
};
