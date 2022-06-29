import React from "react";
import { StarBackground } from "./StarBackground";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Button />", () => {
  it("snapshot test", () => {
    const wrapper = render(<StarBackground />);

    expect(wrapper).toMatchSnapshot();
  });
});
