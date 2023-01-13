import React from "react";
import { TranslucentCard } from "./TranslucentCard";
import "jest-styled-components";
import { render } from "enzyme";

describe("<TranslucentCard />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <TranslucentCard algoMessage="algoMessage" modalTitle={"modalTitle"}>
        <div>children</div>
      </TranslucentCard>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
