import React from "react";
import { StepHeader } from "./StepHeader";
import "jest-styled-components";
import { render } from "enzyme";

describe("<StepHeader />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <StepHeader {...{ step: 0, maxStep: 3, title: "チュートリアル" }} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
