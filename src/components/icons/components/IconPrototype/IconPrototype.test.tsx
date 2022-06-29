import React from "react";
import { shallow } from "enzyme";
import { IconPrototype, IconsDir } from "./IconPrototype";

describe("<IconPrototype />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(
      <IconPrototype
        filename={`${IconsDir()}/adjust_16.svg`}
        size={16}
        fill="red"
        display="block"
        wrapper="span"
      />
    );

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
