import React from "react";
import { shallow } from "enzyme";
import { FirebaseLoginForm } from "./FirebaseLoginForm";

describe("<FirebaseLoginForm />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<FirebaseLoginForm />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
