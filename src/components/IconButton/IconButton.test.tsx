import React from "react";
import { IconButton } from "./IconButton";
import "jest-styled-components";
import { render, shallow } from "enzyme";
import { ArrowLeft } from "components/icons";

describe("<IconButton />", () => {
  it("snapshot test", () => {
    const wrapper = render(<IconButton Icon={ArrowLeft} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("click test", () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <IconButton Icon={ArrowLeft} onClick={clickHandler} />
    );
    wrapper.simulate("click");
    expect(clickHandler).toHaveBeenCalled();
  });
});
