import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { VFrame, VFrameProps } from "./VFrame";
import styled, { css } from "styled-components";

// styled-componentのコンポーネントをそのままstorybookに渡すと動作がおかしくなるので，reactコンポーネントでラップする
const VFrameWrapper: React.FC<VFrameProps> = (props) => (
  <VFrame {...props}>{props.children}</VFrame>
);

export default {
  title: "components/Layout/VFrame",
  component: VFrameWrapper,
} as ComponentMeta<typeof VFrameWrapper>;

const Item = styled.div`
  background-color: royalblue;
  width: 100px;
  height: 100px;
`;

const Template: ComponentStory<typeof VFrameWrapper> = (args) => (
  <VFrame
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
  </VFrame>
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

const Template2: ComponentStory<typeof VFrameWrapper> = (args) => (
  <VFrame
    {...args}
    mixin={[
      css`
        background-color: lightgray;
        height: 500px;
      `,
    ]}
  >
    <Item />
    <Item />
    <Item />
  </VFrame>
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
