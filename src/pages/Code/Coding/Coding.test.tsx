import React from "react";
import { shallow } from "enzyme";
import { CodeCoding } from "./Coding";

describe("<CodeCoding />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<CodeCoding />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
