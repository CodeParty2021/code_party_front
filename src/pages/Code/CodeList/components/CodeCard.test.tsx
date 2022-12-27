import React from "react";
import { shallow } from "enzyme";
import { CodeCard } from "./CodeCard";

describe("<CodeCard />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(
      <CodeCard id={"123"} codeContent={"123"} updatedAt={"123"} />
    );

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
