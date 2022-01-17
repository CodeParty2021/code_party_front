import React from "react";
import { shallow } from "enzyme";
import { useSelector, useDispatch } from "react-redux";
import { StageList } from "./StageList";
import { Stages } from "../../services/StageAPI/StageAPI";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("../../services/StageAPI/StageAPI");

const useSelectorMock = useSelector as jest.Mock<Stages>;
const useDispatchMock = useDispatch as jest.Mock;

describe("<StageList />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      stageList: {
        0: {
          id: 0,
          name: "テストステージ0",
          stage_index: 3,
          rule: "テストテキスト0",
        },
        1: {
          id: 1,
          name: "テストステージ1",
          stage_index: 10,
          rule: "テストテキスト1",
        },
      },
    });
    useDispatchMock.mockReturnValue(jest.fn());
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("dispatches add stage action", () => {
    const wrapper = shallow(<StageList />);

    //expect(wrapper.find("ul").text()).toEqual("<StageDetail />詳細を表示<StageDetail />詳細を表示");
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
