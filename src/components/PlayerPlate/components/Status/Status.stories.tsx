import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Status } from "./Status";

export default {
  title: "components/PlayerPlate/Status",
  component: Status,
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args) => <Status {...args} />;

export const Checked = Template.bind({});
Checked.args = {
  statusMessage: "準備完了",
  viewCheckMark: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  statusMessage: "準備中…",
  viewCheckMark: false,
};
