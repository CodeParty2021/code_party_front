import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MissionNumber } from "./MissionNumber";

export default {
  title: "components/MissionNumber",
  component: MissionNumber,
} as ComponentMeta<typeof MissionNumber>;

const Template: ComponentStory<typeof MissionNumber> = (args) => (
  <MissionNumber {...args} />
);

export const One = Template.bind({});
One.args = {
  number: 1,
};

export const Two = Template.bind({});
Two.args = {
  number: 2,
};

export const Three = Template.bind({});
Three.args = {
  number: 3,
};
