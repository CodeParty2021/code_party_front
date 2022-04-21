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
  size: 200,
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: 300,
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 100,
};
