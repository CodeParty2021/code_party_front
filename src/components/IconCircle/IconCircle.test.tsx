import React from "react";
import { IconCircle } from "./IconCircle";
import "jest-styled-components";
import { render } from "enzyme";
import { Plus } from "components/icons";

describe("<IconCircle />", () => {
  it("snapshot test", () => {
    const wrapper = render(<IconCircle Icon={Plus} />);

    expect(wrapper).toMatchSnapshot();
  });
});
