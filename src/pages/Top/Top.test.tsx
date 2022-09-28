import React from "react";
import { shallow } from "enzyme";
import { Top } from "./Top";
import {
  IResponse,
  IResponse2,
  useFisrtLoginTopState,
  useNormalLoginTopState,
} from "./hooks/useTopState";

jest.mock("./hooks/useTopState");

const useTopStateMock = useFisrtLoginTopState as jest.Mock;
const useTopStateMock2 = useNormalLoginTopState as jest.Mock;

const initialState: IResponse = {
  FirstLoginBtnDisabled: true,
  FirstLoginBtnHandler: () => {},
};

const initialState2: IResponse2 = {
  NormalLoginBtnDisabled: true,
  NormalLoginBtnHandler: () => {},
};

describe("<Top />", () => {
  beforeEach(() => {
    useTopStateMock.mockReturnValue({ ...initialState });
    useTopStateMock2.mockReturnValue({ ...initialState2 });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<Top />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
