import React from "react";
import { shallow } from "enzyme";
import { AnonymousLoginForm } from "./AnonymousLoginForm";

describe("<FirebaseLoginForm />", () => {
  it("auth snapshot test", () => {
    const wrapper = shallow(<AnonymousLoginForm />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
