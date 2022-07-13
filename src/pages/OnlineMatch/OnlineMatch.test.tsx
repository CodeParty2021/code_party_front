import React from "react";
import { shallow } from "enzyme";
import { OnlineMatch } from "./OnlineMatch";
describe("<OnlineMatch />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<OnlineMatch />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
