import React from "react";
import { shallow } from "enzyme";
import { Head } from "./Head";
describe("<Head />", () => {
  it("Head snapshot test", () => {
    const wrapper = shallow(<Head title="title" />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
