import React from "react";
import { shallow } from "enzyme";
import { EventSelectAI } from "./SelectAI";
import { IResponse, useSelectAIState } from "./hooks/useSelectAIState";

jest.mock("./hooks/useSelectAIState");

const useSelectAIStateMock = useSelectAIState as jest.Mock;

const initialState: IResponse = {
  loading: false,
  error: undefined,
  beginTrainHandler: () => {},
};

describe("<EventSelectAI />", () => {
  beforeEach(() => {
    useSelectAIStateMock.mockReturnValue({ ...initialState });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<EventSelectAI />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
