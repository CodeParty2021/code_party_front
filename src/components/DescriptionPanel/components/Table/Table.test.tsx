import React from "react";
import { Table } from "./Table";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Star />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Table />);

    expect(wrapper).toMatchSnapshot();
  });
});
