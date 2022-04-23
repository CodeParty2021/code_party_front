import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Regular, RegularProps } from "./Regular";

// styled-componentのコンポーネントをそのままstorybookに渡すと動作がおかしくなるので，reactコンポーネントでラップする
const RegularWrapper: React.FC<RegularProps> = (props) => (
  <Regular {...props}>{props.children}</Regular>
);

export default {
  title: "components/Text/Regular",
  component: RegularWrapper,
} as ComponentMeta<typeof RegularWrapper>;

const Template: ComponentStory<typeof RegularWrapper> = ({ ...args }) => (
  <Regular {...args}>{args.children}</Regular>
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
