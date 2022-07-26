import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Table } from "./Table";

export default {
  title: "components/DescriptionPanel/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table & { children: any }> = (args) => (
  <Table {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <thead>
        <tr>
          <th>数字</th>
          <th>動作</th>
        </tr>
      </thead>
      <tr>
        <td>0</td>
        <td>下に進む</td>
      </tr>
      <tr>
        <td>1</td>
        <td>右に進む</td>
      </tr>
      <tr>
        <td>2</td>
        <td>上に進む</td>
      </tr>
      <tr>
        <td>3</td>
        <td>左に進む</td>
      </tr>
    </>
  ),
};
