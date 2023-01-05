import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Star } from "./Star";

export default {
  title: "components/Star",
  component: Star,
} as ComponentMeta<typeof Star>;

const Template: ComponentStory<typeof Star> = (args) => <Star {...args} />;

export const Pink = Template.bind({});
Pink.args = {
  color: "pink",
};

export const Yellow = Template.bind({});
Yellow.args = {
  color: "yellow",
};

export const Purple = Template.bind({});
Purple.args = {
  color: "purple",
};

export const Turquoise = Template.bind({});
Turquoise.args = {
  color: "turquoise",
};

export const Gray = Template.bind({});
Gray.args = {
  color: "gray",
};

export const Leaf = Template.bind({});
Leaf.args = {
  color: "leaf",
};

export const Orange = Template.bind({});
Orange.args = {
  color: "orange",
};

export const Magenta = Template.bind({});
Magenta.args = {
  color: "magenta",
};
