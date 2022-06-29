import React from "react";
import { Tab } from "./Tab";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Tab />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Tab value="LOG" />);

    expect(wrapper).toMatchSnapshot();
  });
});
