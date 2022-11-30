import React from "react";
import { StarBackground } from "./StarBackground";
import "jest-styled-components";
import { render } from "enzyme";

describe("<StarBackground />", () => {
  it("snapshot test", () => {
    const wrapper = render(<StarBackground />);
    expect(wrapper).toMatchSnapshot();
  });
});
