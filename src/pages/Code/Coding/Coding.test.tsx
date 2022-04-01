import React from "react";
import { shallow } from "enzyme";
import { CodeCoding } from "./Coding";
import { User } from "services/user/user";

import { useSelector } from "react-redux";
import { Params, useParams } from "react-router-dom";

jest.mock("react-redux");
jest.mock("react-router-dom");

const useSelectorMock = useSelector as jest.Mock<User>;
const useParamsMock = useParams as jest.Mock<Readonly<Params<string>>>;

describe("<CodeCoding />", () => {
  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      id: "string",
      displayName: "string",
      email: "string",
      picture: "string",
      jwt: "string",
    });
    useParamsMock.mockReturnValue({ id: "0" });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("auth snapshot test", () => {
    const wrapper = shallow(<CodeCoding />);

    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
