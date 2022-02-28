import React from "react";
import { shallow } from "enzyme";
import { ModeSelect } from "./ModeSelect";

describe("<ModeSelect />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<ModeSelect />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
