import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PlayerPlateCard } from "./PlayerPlateCard";

export default {
  title: "components/PlayerPlate/PlayerPlateCard",
  component: PlayerPlateCard,
} as ComponentMeta<typeof PlayerPlateCard>;

const Template: ComponentStory<typeof PlayerPlateCard> = (args) => (
  <PlayerPlateCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  playerIcon: <>icon</>,
  viewAlgo: true,
  columnTop: <>top</>,
  columnMiddle: <>middle</>,
  columnBottom: <>bottom</>,
};
