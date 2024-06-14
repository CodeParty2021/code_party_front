import React from "react";
import { LogError } from "./LogError";
import "jest-styled-components";
import { render } from "enzyme";

describe("<LogError />", () => {
  it("snapshot test", () => {
    const wrapper = render(<LogError>syntax error occurred!</LogError>);

    expect(wrapper).toMatchSnapshot();
  });
});
