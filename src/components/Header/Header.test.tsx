import React from "react";
import { Header } from "./Header";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Header />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
