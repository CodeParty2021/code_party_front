import React from "react";
import { shallow } from "enzyme";
import { CodeCording } from "./Cording";

describe("<CodeCording />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<CodeCording />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
