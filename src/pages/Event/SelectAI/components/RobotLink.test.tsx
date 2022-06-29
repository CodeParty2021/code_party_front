import React from "react";
import "jest-styled-components";
import { render, shallow } from "enzyme";
import { RobotLink } from "./RobotLink";

describe("<RobotLink />", () => {
  it("snapshot test", () => {
    const wrapper = render(<RobotLink label={""} number={0} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("click test", () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <RobotLink onClick={clickHandler} label={""} number={0} />
    );
    wrapper.simulate("click");
    expect(clickHandler).toHaveBeenCalled();
  });
});
