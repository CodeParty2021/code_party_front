import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Bold, BoldProps } from "./Bold";

// styled-componentのコンポーネントをそのままstorybookに渡すと動作がおかしくなるので，reactコンポーネントでラップする
const BoldWrapper: React.FC<BoldProps> = (props) => (
  <Bold {...props}>{props.children}</Bold>
);

export default {
  title: "components/Text/Bold",
  component: BoldWrapper,
} as ComponentMeta<typeof BoldWrapper>;

const Template: ComponentStory<typeof BoldWrapper> = (args) => (
  <Bold {...args}>{args.children}</Bold>
);

export const Default = Template.bind({});
Default.args = {
  display: "inline",
  textAlign: "left",
  fontSize: "18px",
  color: "#2F364D",
  lineHeight: "160%",
  whiteSpace: "normal",

  children: "テストテキスト",
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  fontSize: "18px",
};

export const Medium = Template.bind({});
Medium.args = {
  ...Default.args,
  fontSize: "24px",
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  fontSize: "32px",
};
