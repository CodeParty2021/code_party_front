import React from "react";
import { shallow } from "enzyme";
import { AnonymousLoginForm } from "./AnonymousLoginForm";
import { useAnonymousLoginFormState } from "./hooks/useAnonymousLoginFormState";

jest.mock("./hooks/useAnonymousLoginFormState");

const useAnonymousLoginFormMock = useAnonymousLoginFormState as jest.Mock;

const state = {
  anonymousLoginBtnDisabled: true,
  anonymousLoginBtnHandler: jest.fn(),
};

describe("<AnonymousLoginForm />", () => {
  beforeEach(() => {
    useAnonymousLoginFormMock.mockReturnValue({ ...state });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<AnonymousLoginForm />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("anonymous login button test", () => {
    const wrapper = shallow(<AnonymousLoginForm />);

    const btn = wrapper.find("#login-btn");
    btn.simulate("click");

    expect(state.anonymousLoginBtnHandler).toHaveBeenCalled();
  });
});
