import React from "react";
import { Badge } from "./Badge";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Badge />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Badge />);

    expect(wrapper).toMatchSnapshot();
  });

  it("render test turquoise", () => {
    expect(
      render(<Badge badgeName="宇宙の探究者" color="turquoise" />)
    ).toBeTruthy();
  });

  it("render test leaf", () => {
    expect(
      render(<Badge badgeName="宇宙の探究者" color="leaf" />)
    ).toBeTruthy();
  });

  it("render test orange", () => {
    expect(
      render(<Badge badgeName="宇宙の探究者" color="orange" />)
    ).toBeTruthy();
  });

  it("render test magenta", () => {
    expect(
      render(<Badge badgeName="宇宙の探究者" color="magenta" />)
    ).toBeTruthy();
  });
});
