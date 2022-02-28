import React from "react";
import { shallow } from "enzyme";
import { CodeList } from "./CodeList";

describe("<CodeList />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<CodeList />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
