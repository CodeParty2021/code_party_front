import React from "react";
import { shallow } from "enzyme";
import { Loading } from "./Loading";
describe("<Load />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
