import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PlanetPicture } from "./PlanetPicture";

export default {
  title: "components/PlanetPicture",
  component: PlanetPicture,
} as ComponentMeta<typeof PlanetPicture>;

const Template: ComponentStory<typeof PlanetPicture> = (args) => (
  <PlanetPicture {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: "yellow",
  size: "200px",
};

export const Blue = Template.bind({});
Blue.args = {
  ...Default.args,
  color: "blue",
};

export const Pink = Template.bind({});
Pink.args = {
  ...Default.args,
  color: "pink",
};

export const Orange = Template.bind({});
Orange.args = {
  ...Default.args,
  color: "orange",
};
