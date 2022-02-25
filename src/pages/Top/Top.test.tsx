import React from "react";
import { shallow } from "enzyme";
import { Top } from "./Top";

describe("<Top />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<Top />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
