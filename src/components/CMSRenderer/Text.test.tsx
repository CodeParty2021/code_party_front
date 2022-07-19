import React from "react";
import { CMSRenderer } from "./CMSRenderer";
import "jest-styled-components";
import { render } from "enzyme";

describe("<CMSRenderer />", () => {
  it("snapshot test", () => {
    const wrapper = render(<CMSRenderer html="" />);

    expect(wrapper).toMatchSnapshot();
  });
});
