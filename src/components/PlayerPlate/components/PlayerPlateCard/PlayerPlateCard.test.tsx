import React from "react";
import { PlayerPlateCard } from "./PlayerPlateCard";
import "jest-styled-components";
import { render } from "enzyme";

describe("<PlayerPlateCard />", () => {
  it("snapshot test", () => {
    const wrapper = render(
      <PlayerPlateCard
        playerIcon={<>icon</>}
        viewAlgo={true}
        columnTop={<>top</>}
        columnMiddle={<>middle</>}
        columnBottom={<>bottom</>}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
