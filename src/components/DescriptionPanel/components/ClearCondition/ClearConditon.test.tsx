import React from "react";
import { ClearCondition } from "./ClearCondition";
import "jest-styled-components";
import { render } from "enzyme";

describe("<Button />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <ClearCondition
        conditions={["aa", "b"]}
        states={[true, false]}
      ></ClearCondition>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
