import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import { useAppState } from "hooks/AppHooks/useAppState";

jest.mock("hooks/AppHooks/useAppState");

const useAppStateMock = useAppState as jest.Mock;

describe("<App />", () => {
  it("isLoading == true", async () => {
    useAppStateMock.mockReturnValue({
      isLoading: true,
      isClose: false,
      isDev: false,
    });
    const wrapper = shallow(<App />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
  it("isClose == true", async () => {
    useAppStateMock.mockReturnValue({
      isLoading: false,
      isClose: true,
      isDev: false,
    });
    const wrapper = shallow(<App />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
  it("isDev == true", async () => {
    useAppStateMock.mockReturnValue({
      isLoading: false,
      isClose: false,
      isDev: true,
    });
    const wrapper = shallow(<App />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
