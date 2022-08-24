import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CodeBlock } from "./CodeBlock";

export default {
  title: "components/CodeBlock",
  component: CodeBlock,
} as ComponentMeta<typeof CodeBlock>;

const Template: ComponentStory<typeof CodeBlock> = (args) => (
  <CodeBlock {...args} />
);

export const Default = Template.bind({});
var code = '\
import codeparty.squarepaint\n\
\n\
UP,DOWN,LEFT,RIGHT = 0,1,2,3\n\
\n\
def action(helper):\n\
    # ここを編集しよう\n\
    return UP'
Default.args = {
  code: code,
  fontSize: 18,
  height: 0,
  editorProps: {},
};
