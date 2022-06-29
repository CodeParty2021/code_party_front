import React from "react";
import { Star } from "./Star";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Star />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Star />);

    expect(wrapper).toMatchSnapshot();
  });

  it("render test black S", () => {
    expect(render(<Star />)).toBeTruthy();
  });
});
