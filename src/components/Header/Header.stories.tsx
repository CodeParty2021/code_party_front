import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "./Header";

export default {
  title: "components/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

const withButtonMessage: ComponentStory<typeof Header> = (args) => (
  <Header {...args}></Header>
);

export const withComponent = withButtonMessage.bind({});
withComponent.args = {
  backMessage: "戻る",
  backButtonHandler: () => {
    alert("戻るボタンがクリックされました！");
  },
};
