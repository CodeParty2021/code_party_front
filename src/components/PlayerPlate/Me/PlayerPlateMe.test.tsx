import React from "react";
import { PlayerPlateMe } from "./PlayerPlateMe";
import "jest-styled-components";
import { render } from "enzyme";

describe("<PlayerPlateMe />", () => {
  const defaultProps = {
    userName: "ほげ太郎",
    userPhoto: "/logo512.png",
    badge: "宇宙の探究者",
    color: "turquoise",
    status: "default",
    selectedCodeName: "ランダムに進むロボット.py",
  } as const;

  it("snapshot test", () => {
    const wrapper = render(<PlayerPlateMe {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("render test turquoise default", () => {
    expect(
      render(
        <PlayerPlateMe {...defaultProps} color="turquoise" status="default" />
      )
    ).toBeTruthy();
  });

  it("render test orange ready", () => {
    expect(
      render(<PlayerPlateMe {...defaultProps} color="orange" status="ready" />)
    ).toBeTruthy();
  });

  it("render test leaf", () => {
    expect(
      render(<PlayerPlateMe {...defaultProps} color="leaf" />)
    ).toBeTruthy();
  });

  it("render test magenta", () => {
    expect(
      render(<PlayerPlateMe {...defaultProps} color="magenta" />)
    ).toBeTruthy();
  });
});
