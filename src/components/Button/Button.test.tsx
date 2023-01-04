import React from "react";
import { Button } from "./Button";
import "jest-styled-components";
import { render, shallow } from "enzyme";
import { Times } from "components/icons";

describe("<Button />", () => {
  it("snapshot test", () => {
    const wrapper = render(<Button />);

    expect(wrapper).toMatchSnapshot();
  });

  it("render test black S", () => {
    expect(
      render(<Button color="black" size="S" status="default" value="テスト" />)
    ).toBeTruthy();
  });

  it("render test blue M", () => {
    expect(
      render(<Button color="blue" size="M" status="default" value="テスト" />)
    ).toBeTruthy();
  });

  it("render test pink L", () => {
    expect(
      render(<Button color="pink" size="L" status="default" value="テスト" />)
    ).toBeTruthy();
  });

  it("render test green L", () => {
    expect(
      render(<Button color="green" size="L" status="default" value="テスト" />)
    ).toBeTruthy();
  });

  it("render test white S icon", () => {
    expect(
      render(
        <Button
          color="white"
          size="S"
          status="default"
          value="テスト"
          icon="left"
          Icon={Times}
        />
      )
    ).toBeTruthy();
  });

  it("render test disabled L", () => {
    expect(
      render(<Button size="L" status="disabled" value="テスト" />)
    ).toBeTruthy();
  });

  it("click test", () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <Button
        size="L"
        status="disabled"
        value="テスト"
        onClick={clickHandler}
      />
    );
    wrapper.simulate("click");
    expect(clickHandler).toHaveBeenCalled();
  });
});
