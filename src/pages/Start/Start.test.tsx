import React from "react";
import { shallow } from "enzyme";
import { Start } from "./Start";

describe("<Start />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<Start />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
