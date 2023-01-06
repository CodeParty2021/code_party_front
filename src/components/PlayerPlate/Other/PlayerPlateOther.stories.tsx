import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PlayerPlateOther } from "./PlayerPlateOther";

export default {
  title: "components/PlayerPlate/PlayerPlateOther",
  component: PlayerPlateOther,
} as ComponentMeta<typeof PlayerPlateOther>;

const Template: ComponentStory<typeof PlayerPlateOther> = (args) => (
  <PlayerPlateOther {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userName: "ふが次郎",
  userType: "user",
  userPhoto: "/logo512.png",
  badge: "しがないプログラマ",
  color: "turquoise",
  status: "default",
};

export const OrangeReady = Template.bind({});
OrangeReady.args = {
  ...Default.args,
  color: "orange",
  status: "ready",
};

export const LeafDisconnecting = Template.bind({});
LeafDisconnecting.args = {
  ...Default.args,
  color: "leaf",
  status: "disconnecting",
};

export const MagentaBot = Template.bind({});
MagentaBot.args = {
  ...Default.args,
  color: "magenta",
  status: "bot",
};

export const TurquoiseWaiting = Template.bind({});
TurquoiseWaiting.args = {
  ...Default.args,
  color: "turquoise",
  status: "waiting",
};
