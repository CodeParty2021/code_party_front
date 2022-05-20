import React from "react";
import { LogItem } from "./LogItem";
import "jest-styled-components";
import { render } from "enzyme";

describe("<LogItem />", () => {
  it("snapshot test", () => {
    const wrapper = render(<LogItem turnNum={1} log="hello, world" />);

    expect(wrapper).toMatchSnapshot();
  });
});
