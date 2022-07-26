import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DescriptionPanel } from "./DescriptionPanel";
import { DescriptionCMSType } from "hooks/DescriptionCMSHooks/useDescriptionCMS";

export default {
  title: "components/DescriptionPanel/DescriptionPanel",
  component: DescriptionPanel,
} as ComponentMeta<typeof DescriptionPanel>;

const Template: ComponentStory<typeof DescriptionPanel> = (args) => (
  <DescriptionPanel {...args} />
);

const sampleJSON: DescriptionCMSType = {
  id: "u3w7er2atby",
  createdAt: "2022-04-19T02:58:25.852Z",
  updatedAt: "2022-07-19T07:07:55.367Z",
  publishedAt: "2022-04-19T02:58:25.852Z",
  revisedAt: "2022-07-19T07:07:55.367Z",
  worldIndex: 1,
  stageIndex: 1,
  stepIndex: 1,
  body: [
    {
      fieldId: "body",
      html: '<h1 id="hc9f08a00f8">ステージ１</h1><p>次の画像のように動こう<br><br><img src="https://images.microcms-assets.io/assets/4712ba13111f4c01bab9c344ae473307/40378f930361435f8596628bd0264402/blog-template-description3.png" alt=""></p>',
    },
    {
      fieldId: "table",
      body: "<table>\n<thead><th>1</th><th>2</th>\n<tr><td>a</td><td>b</td></tr>\n</table>",
    },
    {
      fieldId: "clearCondition",
      condition: [
        {
          fieldId: "text",
          text: "まるまるをこれこれしよう",
        },
      ],
    },
    {
      fieldId: "hintBox",
      title: "関数とは",
      body: '<h1 id="hb3ab3aee6b">関数とは</h1><p>関数はプログラムの塊</p><pre><code>function func(){\n  console.log(aaa)\n}</code></pre>',
    },
  ],
};
export const Default = Template.bind({});
Default.args = {
  description: sampleJSON,
  stage: 1,
  maxStep: 3,
  workingStep: 1,
  completeStep: 1,
  title: "チュートリアル",
};
