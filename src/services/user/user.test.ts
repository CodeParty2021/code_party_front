import reducer, { signIn, signOut, User, LoginUserState } from "./user";

test("reducer test ( signIn and signOut ) ", () => {
  // define the initial state
  const previousState: LoginUserState = {
    user: null,
    isLogin: false,
    unRegisterObserver: null,
    loading: true,
  };

  const loginUser: User = {
    id: "id1234",
    displayName: "コアラ",
    email: "sample@sample.com",
    picture: "sample.png",
    jwt: "token",
    isAnonymous: false,
  };

  // login test
  expect(reducer(previousState, signIn(loginUser))).toEqual({
    user: {
      id: "id1234",
      displayName: "コアラ",
      email: "sample@sample.com",
      picture: "sample.png",
      jwt: "token",
      isAnonymous: false,
    },
    unRegisterObserver: null,
    isLogin: true,
    loading: false,
  });
  // signout test
  expect(reducer(previousState, signOut())).toEqual({
    user: null,
    unRegisterObserver: null,
    isLogin: false,
    loading: false,
  });
});
