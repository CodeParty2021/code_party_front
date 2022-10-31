import React from "react";
import { shallow } from "enzyme";
import { RoomMatchPickCode } from "./PickCode";

describe("<RoomMatchPickCode />", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<RoomMatchPickCode />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
