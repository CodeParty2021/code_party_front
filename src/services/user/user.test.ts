import reducer, { signIn, signOut, User, UserState } from "./user";

test("reducer test ( signIn and signOut ) ", () => {
  // define the initial state
  const previousState: UserState = {
    user: null,
    isLogin: false,
    unRegisterObserver: null,
  };

  const loginUser: User = {
    id: "id1234",
    displayName: "コアラ",
    email: "sample@sample.com",
    picture: "sample.png",
    jwt: "token",
  };

  // login test
  expect(reducer(previousState, signIn(loginUser))).toEqual({
    user: {
      id: "id1234",
      displayName: "コアラ",
      email: "sample@sample.com",
      picture: "sample.png",
      jwt: "token",
    },
    unRegisterObserver: null,
    isLogin: true,
  });
  // signout test
  expect(reducer(previousState, signOut())).toEqual({
    user: null,
    unRegisterObserver: null,
    isLogin: false,
  });
});
