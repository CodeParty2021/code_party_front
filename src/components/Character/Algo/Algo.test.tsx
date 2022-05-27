import React from "react";
import { Algo } from "./Algo";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Algo />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Algo />);

    expect(wrapper).toMatchSnapshot();
  });
});
