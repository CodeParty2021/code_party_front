import React from "react";
import { StageHeader } from "./StageHeader";
import "jest-styled-components";
import { render } from "enzyme";

describe("<StageHeader />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <StageHeader
        {...{ stage: 1, completeStep: 0, workingStep: 1, maxStep: 3 }}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
