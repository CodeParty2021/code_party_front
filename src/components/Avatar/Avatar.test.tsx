import React from "react";
import { Avatar } from "./Avatar";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Avatar />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Avatar />);

    expect(wrapper).toMatchSnapshot();
  });

  it("render test user turquoise", () => {
    expect(
      render(<Avatar type="user" color="turquoise" />)
    ).toBeTruthy();
  });

  it("render test user leaf", () => {
    expect(
      render(<Avatar type="user" color="leaf" />)
    ).toBeTruthy();
  });

  it("render test user orange", () => {
    expect(
      render(<Avatar type="user" color="orange" />)
    ).toBeTruthy();
  });

  it("render test user pink", () => {
    expect(
      render(<Avatar type="user" color="pink" />)
    ).toBeTruthy();
  });

  it("render test user hasImage", () => {
    expect(
      render(<Avatar type="user" userPhotoUrl="/test.png" />)
    ).toBeTruthy();
  });

  it("render test anonymous", () => {
    expect(
      render(<Avatar type="anonymous" />)
    ).toBeTruthy();
  });

  it("render test robot", () => {
    expect(
      render(<Avatar type="robot" />)
    ).toBeTruthy();
  });
});
