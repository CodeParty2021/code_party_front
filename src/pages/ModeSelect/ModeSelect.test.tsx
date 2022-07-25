import React from "react";
import { shallow } from "enzyme";
import { ModeSelect } from "./ModeSelect";

describe("<ModeSelect />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<ModeSelect />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
