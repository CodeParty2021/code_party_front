import React from "react";
import { DescriptionText, ModeSelectCard } from "./ModeSelectCard";
import "jest-styled-components";
import { render, shallow } from "enzyme";

describe("<ModeSelectCard />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <ModeSelectCard
        imageName="grab_flag_lobo"
        title="訓練モード"
        description={
          <>
            AIが搭載されたコンピュータと
            <br />
            対戦することが出来ます。
          </>
        }
        icon="setting"
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("render test black S", () => {
    expect(
      render(
        <ModeSelectCard
          imageName="grab_flag_lobo"
          title="訓練モード"
          description={
            <DescriptionText>
              <>
                AIが搭載されたコンピュータと
                <br />
                対戦することが出来ます。
              </>
            </DescriptionText>
          }
          icon="setting"
          disabled={true}
        />
      )
    ).toBeTruthy();
  });

  it("click test", () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <ModeSelectCard
        imageName="grab_flag_lobo"
        title="訓練モード"
        description={
          <>
            AIが搭載されたコンピュータと
            <br />
            対戦することが出来ます。
          </>
        }
        icon="setting"
        onClick={clickHandler}
      />
    );
    wrapper.simulate("click");
    expect(clickHandler).toHaveBeenCalled();
  });
});
