import React from "react";
import { RoundedButton } from "./RoundedButton";
import "jest-styled-components";
import { render, shallow } from "enzyme";

describe("<RoundedButton />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <RoundedButton
        value="次へ"
        icon="left"
        disabled={false}
        onClick={() => {}}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("render test disabled", () => {
    expect(
      render(
        <RoundedButton
          value="次へ"
          icon="left"
          disabled={true}
          onClick={() => {}}
        />
      )
    ).toBeTruthy();
  });

  it("click test", () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <RoundedButton
        value="次へ"
        icon="left"
        disabled={false}
        onClick={clickHandler}
      />
    );
    wrapper.simulate("click");
    expect(clickHandler).toHaveBeenCalled();
  });
});
