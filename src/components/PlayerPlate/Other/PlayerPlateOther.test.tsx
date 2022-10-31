import React from "react";
import { PlayerPlateOther } from "./PlayerPlateOther";
import "jest-styled-components";
import { render } from "enzyme";

describe("<PlayerPlateOther />", () => {
  const defaultProps = {
    userName: "ふが次郎",
    userPhoto: "/logo512.png",
    badge: "しがないプログラマ",
    color: "turquoise",
    status: "default",
  } as const;

  it("snapshot test", () => {
    const wrapper = render(<PlayerPlateOther {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("render test turquoise default", () => {
    expect(
      render(
        <PlayerPlateOther
          {...defaultProps}
          color="turquoise"
          status="default"
        />
      )
    ).toBeTruthy();
  });

  it("render test orange ready", () => {
    expect(
      render(
        <PlayerPlateOther {...defaultProps} color="orange" status="ready" />
      )
    ).toBeTruthy();
  });

  it("render test leaf", () => {
    expect(
      render(<PlayerPlateOther {...defaultProps} color="leaf" />)
    ).toBeTruthy();
  });

  it("render test magenta", () => {
    expect(
      render(<PlayerPlateOther {...defaultProps} color="magenta" />)
    ).toBeTruthy();
  });
});
