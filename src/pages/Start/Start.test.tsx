import React from "react";
import { useStartState } from "./hooks/useStartState";
import { shallow } from "enzyme";
import { Start } from "./Start";

jest.mock("./hooks/useStartState");

const useStartStateMock = useStartState as jest.Mock;

describe("<Start />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("anonymousLogin: true, firebaseLogin: true", () => {
    useStartStateMock.mockReturnValue({
      anonymousLoginFormDisplay: true,
      firebaseLoginFormDisplay: true,
    });

    const wrapper = shallow(<Start />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("anonymousLogin: true, firebaseLogin: false", () => {
    useStartStateMock.mockReturnValue({
      anonymousLoginFormDisplay: true,
      firebaseLoginFormDisplay: false,
    });

    const wrapper = shallow(<Start />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("anonymousLogin: false, firebaseLogin: true", () => {
    useStartStateMock.mockReturnValue({
      anonymousLoginFormDisplay: false,
      firebaseLoginFormDisplay: true,
    });

    const wrapper = shallow(<Start />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("anonymousLogin: false, firebaseLogin: false", () => {
    useStartStateMock.mockReturnValue({
      anonymousLoginFormDisplay: false,
      firebaseLoginFormDisplay: false,
    });

    const wrapper = shallow(<Start />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
