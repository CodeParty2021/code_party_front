import React from "react";
import { Message } from "./Message";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Message />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Message title="タイトル" value="メッセージ" />);

    expect(wrapper).toMatchSnapshot();
  });
});
