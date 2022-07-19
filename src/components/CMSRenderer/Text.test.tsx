import React from "react";
import { CMSRenderer } from "./CMSRenderer";
import "jest-styled-components";
import { render } from "enzyme";
import { DescriptionCMSType } from "hooks/DescriptionCMSHooks/useDescriptionCMS";

const sampleJSON:DescriptionCMSType = {
  "id": "u3w7er2atby",
  "createdAt": "2022-04-19T02:58:25.852Z",
  "updatedAt": "2022-07-19T07:07:55.367Z",
  "publishedAt": "2022-04-19T02:58:25.852Z",
  "revisedAt": "2022-07-19T07:07:55.367Z",
  "worldIndex": 1,
  "stageIndex": 1,
  "stepIndex": 1,
  "body": [
      {
          "fieldId": "body",
          "html": "<h1 id=\"hc9f08a00f8\">ステージ１</h1><p>次の画像のように動こう<br><br><img src=\"https://images.microcms-assets.io/assets/4712ba13111f4c01bab9c344ae473307/40378f930361435f8596628bd0264402/blog-template-description3.png\" alt=\"\"></p>"
      },
      {
          "fieldId": "table",
          "body": "<table>\n<thead><th>1</th><th>2</th>\n<tr><td>a</td><td>b</td></tr>\n</table>"
      },
      {
          "fieldId": "clearCondition",
          "condition": [
              {
                  "fieldId": "text",
                  "text": "まるまるをこれこれしよう"
              }
          ]
      },
      {
          "fieldId": "hintBox",
          "title": "関数とは",
          "body": "<h1 id=\"hb3ab3aee6b\">関数とは</h1><p>関数はプログラムの塊</p><pre><code>function func(){\n  console.log(aaa)\n}</code></pre>"
      }
  ]
}
describe("<CMSRenderer />", () => {
  it("snapshot test", () => {
    const wrapper = render(<CMSRenderer description={sampleJSON} />);

    expect(wrapper).toMatchSnapshot();
  });
});
