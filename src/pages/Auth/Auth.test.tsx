import React from "react";
import { shallow } from "enzyme";
import { Auth } from "./Auth";
describe("<Auth />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<Auth />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
