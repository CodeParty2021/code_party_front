import React from "react";
import { ModeSelectCard } from "./ModeSelectCard";
import "jest-styled-components";
import { render, shallow } from "enzyme";

describe("<ModeSelectCard />", () => {
  it("snapshot test", () => {
    const wrapper = render(<ModeSelectCard mode="solo" />);

    expect(wrapper).toMatchSnapshot();
  });

  it("render test black S", () => {
    expect(
      render(<ModeSelectCard mode="battle" disabled={true} />)
    ).toBeTruthy();
  });

  it("click test", () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <ModeSelectCard mode="solo" onClick={clickHandler} />
    );
    wrapper.simulate("click");
    expect(clickHandler).toHaveBeenCalled();
  });
});
