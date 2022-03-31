import React from "react";
import { shallow } from "enzyme";
import { Description } from "./Description";

describe("<Description />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<Description />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
