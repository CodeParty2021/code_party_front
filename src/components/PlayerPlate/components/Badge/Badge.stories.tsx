import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Badge } from "./Badge";

export default {
  title: "components/PlayerPlate/Badge",
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Turquoise = Template.bind({});
Turquoise.args = {
  badgeName: "宇宙の探究者",
  color: "turquoise",
};

export const Leaf = Template.bind({});
Leaf.args = {
  badgeName: "宇宙の探究者",
  color: "leaf",
};

export const Orange = Template.bind({});
Orange.args = {
  badgeName: "宇宙の探究者",
  color: "orange",
};

export const Magenta = Template.bind({});
Magenta.args = {
  badgeName: "宇宙の探究者",
  color: "magenta",
};
