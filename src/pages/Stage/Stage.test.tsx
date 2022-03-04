import React from "react";
import { shallow } from "enzyme";
import { useSelector, useDispatch } from "react-redux";
import { Stage } from "./Stage";
import { Stages } from "../../services/StageAPI/StageAPI";
import { Params, useParams } from "react-router-dom";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("../../services/StageAPI/StageAPI");

const useSelectorMock = useSelector as jest.Mock<Stages>;
const useDispatchMock = useDispatch as jest.Mock;
const useParamsMock = useParams as jest.Mock<Readonly<Params<string>>>;

describe("<Stage />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      stageList: {
        0: {
          id: 0,
          name: "テストステージ",
          stage_index: 3,
          rule: "テストテキスト",
        },
      },
    });
    useDispatchMock.mockReturnValue(jest.fn());
    useParamsMock.mockReturnValue({ id: "0" });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("dispatches add stage action", () => {
    const wrapper = shallow(<Stage />);

    //expect(wrapper.find("li").text()).toEqual("<StageDetail />");
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
