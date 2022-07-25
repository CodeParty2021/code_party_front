import React from "react";
import { shallow } from "enzyme";
import { Garage } from "./Garage";
describe("<Garage />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<Garage />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
