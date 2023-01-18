import React from "react";
import { LogPanel } from "./LogPanel";
import "jest-styled-components";
import { render } from "enzyme";

describe("<LogPanel />", () => {
  it("snapshot test", () => {
    const wrapper = render(<LogPanel state="log"/>);

    expect(wrapper).toMatchSnapshot();
  });
});
