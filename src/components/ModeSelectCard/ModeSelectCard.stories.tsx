import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ModeSelectCard } from "./ModeSelectCard";
import { Description } from "pages/Code/Coding/components/Description/Description";

export default {
  title: "components/ModeSelectCard",
  component: ModeSelectCard,
} as ComponentMeta<typeof ModeSelectCard>;

const Template: ComponentStory<typeof ModeSelectCard> = (args) => (
  <ModeSelectCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imageName: "grab_flag_lobo",
  title: "タイトルテキスト",
  description: <Description>中身の説明文</Description>,
  icon: "setting",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  imageName: "grab_flag_lobo",
  title: "タイトルテキスト",
  description: <Description>中身の説明文</Description>,
  icon: "setting",
  disabled: true,
};
