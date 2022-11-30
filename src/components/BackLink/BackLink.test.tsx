import React from "react";
import { BackLink } from "./BackLink";
import "jest-styled-components";
import { render } from "enzyme";

describe("<BackLink />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <BackLink backMessage={"戻る"} onClick={() => {}} iconColor={"blue"} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
