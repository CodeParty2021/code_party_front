import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PlayerPlateMe } from "./PlayerPlateMe";

export default {
  title: "components/PlayerPlate/PlayerPlateMe",
  component: PlayerPlateMe,
} as ComponentMeta<typeof PlayerPlateMe>;

const Template: ComponentStory<typeof PlayerPlateMe> = (args) => (
  <PlayerPlateMe {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userName: "ほげ太郎",
  userPhoto: "/logo512.png",
  badge: "宇宙の探究者",
  color: "turquoise",
  status: "default",
  selectedCodeName: "ランダムに進むロボット.py",
};

export const OrangeReady = Template.bind({});
OrangeReady.args = {
  ...Default.args,
  color: "orange",
  status: "ready",
};

export const Leaf = Template.bind({});
Leaf.args = {
  ...Default.args,
  color: "leaf",
};

export const Magenta = Template.bind({});
Magenta.args = {
  ...Default.args,
  color: "magenta",
};
