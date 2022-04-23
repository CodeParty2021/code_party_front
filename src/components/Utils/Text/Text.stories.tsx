import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Text, TextProps } from "./Text";

// styled-componentのコンポーネントをそのままstorybookに渡すと動作がおかしくなるので，reactコンポーネントでラップする
const TextWrapper: React.FC<TextProps> = (props) => (
  <Text {...props}>{props.children}</Text>
);

export default {
  title: "components/Text/Default",
  component: TextWrapper,
} as ComponentMeta<typeof TextWrapper>;

const Template: ComponentStory<typeof TextWrapper> = (args) => (
  <Text {...args}>{args.children}</Text>
);

export const Default = Template.bind({});
Default.args = {
  display: "inline",
  textAlign: "left",
  fontSize: "18px",
  color: "#2F364D",
  fontWeight: "normal",
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
