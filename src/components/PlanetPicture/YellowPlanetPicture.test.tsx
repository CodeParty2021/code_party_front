import React from "react";
import { shallow } from "enzyme";
import { YellowPlanetPicture } from "./YellowPlanetPicture";
describe("<YellowPlanetPicture />", () => {
  it("YellowPlanetPicture snapshot test", () => {
    const wrapper = shallow(<YellowPlanetPicture size="160px" />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
