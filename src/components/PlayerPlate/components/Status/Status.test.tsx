import React from "react";
import { Status } from "./Status";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Status />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <Status statusMessage="message" viewCheckMark={true} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("render test turquoise", () => {
    expect(
      render(
        <Status
          statusMessage="message"
          viewCheckMark={true}
          color="turquoise"
        />
      )
    ).toBeTruthy();
  });

  it("render test leaf", () => {
    expect(
      render(
        <Status statusMessage="message" viewCheckMark={true} color="leaf" />
      )
    ).toBeTruthy();
  });

  it("render test orange", () => {
    expect(
      render(
        <Status statusMessage="message" viewCheckMark={true} color="orange" />
      )
    ).toBeTruthy();
  });

  it("render test magenta", () => {
    expect(
      render(
        <Status statusMessage="message" viewCheckMark={true} color="magenta" />
      )
    ).toBeTruthy();
  });
});
