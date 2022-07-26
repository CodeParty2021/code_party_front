import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { H1, H2 } from "./Heading";

export default {
  title: "components/DescriptionPanel/H1",
  component: H1,
} as ComponentMeta<typeof H1>;

const Template: ComponentStory<typeof H1 & { children: any }> = (args) => (
  <H1 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: <>H1のサンプル</>,
  id: 1,
};

const Template2: ComponentStory<typeof H2 & { children: any }> = (args) => (
  <H2 {...args} />
);

export const Default2 = Template2.bind({});
Default2.args = {
  children: <>H2のサンプル</>,
};
