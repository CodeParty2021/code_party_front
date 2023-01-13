import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TranslucentCard } from "./TranslucentCard";
import { AlgoHead } from "components/Character/Algo/Head/AlgoHead";

export default {
  title: "components/TranslucentCard",
  component: TranslucentCard,
} as ComponentMeta<typeof TranslucentCard>;

const Template: ComponentStory<typeof TranslucentCard> = (args) => (
  <TranslucentCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};

const withComponentTemplate: ComponentStory<typeof TranslucentCard> = (
  args
) => (
  <TranslucentCard {...args}>
    <AlgoHead />
  </TranslucentCard>
);

export const withComponent = withComponentTemplate.bind({});
withComponent.args = {
  modalTitle: "Modal Title",
  algoMessage: "Algo Message",
};
