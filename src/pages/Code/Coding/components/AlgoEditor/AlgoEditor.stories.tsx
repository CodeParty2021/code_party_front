import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AlgoEditor } from "./AlgoEditor";

export default {
  title: "components/AlgoEditor",
  component: AlgoEditor,
} as ComponentMeta<typeof AlgoEditor>;

const Template: ComponentStory<typeof AlgoEditor> = (args) => (
  <AlgoEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: "1200px",
  height: "800px",
  close: false,
};
