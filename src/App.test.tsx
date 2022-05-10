import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "services/user/user";

jest.mock("firebase/database");
jest.mock("firebase/auth");

describe("XXX Component Test Cases", () => {
  // テスト用のstore
  let store: Store<any, AnyAction>;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
  });

  it("テストケース1", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // screen.debug();
  });
});
