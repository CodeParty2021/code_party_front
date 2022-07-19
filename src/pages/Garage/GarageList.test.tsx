import React from "react";
import { shallow } from "enzyme";
import { GarageList } from "./GarageList";
describe("<GarageList />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<GarageList />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
