import React from "react";
import { MissionNumber } from "./MissionNumber";
import "jest-styled-components";
import { render } from "enzyme";

describe("<MissionNumber />", () => {
  it("snapshot test", () => {
    const wrapper = render(<MissionNumber number={1} />);

    expect(wrapper).toMatchSnapshot();
  });
});
