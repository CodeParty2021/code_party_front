import React from "react";
import { AlgoHead } from "./AlgoHead";
import "jest-styled-components";
import { render } from "enzyme";

describe("<AlgoHead />", () => {
  it("snapshot test", () => {
    const wrapper = render(<AlgoHead />);

    expect(wrapper).toMatchSnapshot();
  });
});
