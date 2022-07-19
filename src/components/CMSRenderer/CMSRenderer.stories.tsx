import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CMSRenderer } from "./CMSRenderer";

export default {
  title: "components/CMSRenderer",
  component: CMSRenderer,
} as ComponentMeta<typeof CMSRenderer>;

const Template: ComponentStory<typeof CMSRenderer> = (args) => (
  <CMSRenderer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  html: '<h1 id="h5dc0e46670">aaaaa</h1><h1 id="h5dc0e46670">aaaaa</h1><p>aaaaaa<br><code>aaaaaaaaaaaaaaaaaaaaaaaaaaaa</code></p><pre><code>aaasdfas</code></pre><blockquote>aaaaaa<br>aaaa<br>aaa<br>s</blockquote>',
};
