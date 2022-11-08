import React from "react";
import { shallow } from "enzyme";
import { SelectMode } from "./SelectMode";

describe("<SelectMode />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<SelectMode />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
