import { shallow } from "enzyme";
import { useSelector, useDispatch } from "react-redux";

import { UserState } from "services/user/user";

import { CasualBattleWaitingRoom } from "./WaitingRoom";
import { useNavigate } from "react-router-dom";

jest.mock("react-redux");
jest.mock("react-router-dom");
jest.mock("services/RoomSync/RoomSync");

const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;

const user: UserState = {
  isLogin: true,
  user: {
    id: "userid1",
    displayName: "user1",
    email: "useremail",
    picture: "picture url",
    jwt: "user jwt",
  },
  unRegisterObserver: null,
};

describe("<CasualBattleWaitingRoom />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      //...roomEnteredState,
      ...user,
    });
    useDispatchMock.mockReturnValue(jest.fn());
    useNavigateMock.mockReturnValue(jest.fn(()=> (to: string) => to));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("snapshot test", () => {
    const wrapper = shallow(<CasualBattleWaitingRoom />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
