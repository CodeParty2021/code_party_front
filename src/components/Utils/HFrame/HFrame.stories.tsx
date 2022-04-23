import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HFrame, HFrameProps } from "./HFrame";
import styled, { css } from "styled-components";

// styled-componentのコンポーネントをそのままstorybookに渡すと動作がおかしくなるので，reactコンポーネントでラップする
const HFrameWrapper: React.FC<HFrameProps> = (props) => (
  <HFrame {...props}>{props.children}</HFrame>
);

export default {
  title: "components/Layout/HFrame",
  component: HFrameWrapper,
} as ComponentMeta<typeof HFrameWrapper>;

const Item = styled.div`
  background-color: royalblue;
  width: 100px;
  height: 100px;
`;

const Template: ComponentStory<typeof HFrameWrapper> = (args) => (
  <HFrame
    {...args}
    mixin={[
      css`
        background-color: lightgray;
      `,
    ]}
  >
    <Item />
    <Item />
    <Item />
  </HFrame>
);

export const Default = Template.bind({});
Default.args = {
  display: "flex",
  wrap: "nowrap",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  spacing: "10px",
};

export const FlexStart = Template.bind({});
FlexStart.args = {
  ...Default.args,
  alignItems: "flex-start",
  justifyContent: "flex-start",
};

export const Center = Template.bind({});
Center.args = {
  ...Default.args,
  alignItems: "center",
  justifyContent: "center",
};

export const FlexEnd = Template.bind({});
FlexEnd.args = {
  ...Default.args,
  alignItems: "flex-end",
  justifyContent: "flex-end",
};

export const Inline = Template.bind({});
Inline.args = {
  ...Default.args,
  display: "inline-flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
};

const Template2: ComponentStory<typeof HFrameWrapper> = (args) => (
  <HFrame
    {...args}
    mixin={[
      css`
        background-color: lightgray;
        width: 500px;
      `,
    ]}
  >
    <Item />
    <Item />
    <Item />
  </HFrame>
);

export const justifyCenter = Template2.bind({});
justifyCenter.args = {
  ...Default.args,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

export const justifyBetween = Template2.bind({});
justifyBetween.args = {
  ...Default.args,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
};
