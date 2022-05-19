import React from "react";
import { shallow } from "enzyme";
import { PlanetPicture } from "./PlanetPicture";

describe("<PlanetPicture />", () => {
  it("PlanetPicture snapshot test", () => {
    const wrapper = shallow(<PlanetPicture color="blue" size="161px" />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
