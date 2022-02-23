import React from "react";
import { shallow } from "enzyme";
import { PlanetPicture } from "./PlanetPicture";
describe("<Auth />", () => {
  it("PlanetPicture snapshot test", () => {
    const wrapper = shallow(<PlanetPicture color={""} size={161} />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
