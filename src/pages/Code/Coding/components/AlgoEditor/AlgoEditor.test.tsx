import React from "react";
import { AlgoEditor } from "./AlgoEditor";
import "jest-styled-components";
import { render } from "enzyme";

describe("<AlgoEditor />", () => {
  it("snapshot test", () => {
    const wrapper = render(<AlgoEditor />);

    expect(wrapper).toMatchSnapshot();
  });
});
