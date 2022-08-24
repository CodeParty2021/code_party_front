import React from "react";
import { CodeBlock } from "./CodeBlock";
import "jest-styled-components";
import { render } from "enzyme";

describe("<CodeBlock />", () => {
  it("snapshot test", () => {
    const wrapper = render(<CodeBlock />);

    expect(wrapper).toMatchSnapshot();
  });
});
