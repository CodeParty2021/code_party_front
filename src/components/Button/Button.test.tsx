import React from "react";
import { Button } from "./Button";
import "jest-styled-components";
import { renderWithTheme, shallowWithTheme } from "utils/test/renderWithTheme";

describe("<Button />", () => {
  it("snapshot test", () => {
    const wrapper = renderWithTheme(<Button />);

    expect(wrapper).toMatchSnapshot();
  });

  it("render test black S", () => {
    expect(
      renderWithTheme(
        <Button color="black" size="S" status="default" value="テスト" />
      )
    ).toBeTruthy();
  });

  it("render test blue M", () => {
    expect(
      renderWithTheme(
        <Button color="blue" size="M" status="default" value="テスト" />
      )
    ).toBeTruthy();
  });

  it("render test pink L", () => {
    expect(
      renderWithTheme(
        <Button color="pink" size="L" status="default" value="テスト" />
      )
    ).toBeTruthy();
  });

  it("render test disabled L", () => {
    expect(
      renderWithTheme(<Button size="L" status="disabled" value="テスト" />)
    ).toBeTruthy();
  });

  it("click test", () => {
    const clickHandler = jest.fn();
    const wrapper = shallowWithTheme(
      <Button
        size="L"
        status="disabled"
        value="テスト"
        onClick={clickHandler}
      />
    );
    wrapper.find("Button").simulate("click");
    expect(clickHandler).toHaveBeenCalled();
  });
});
