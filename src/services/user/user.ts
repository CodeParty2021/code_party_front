import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import axios from "axios";

export type User = {
  idToken: string;
  displayName: string;
  email: string;
  photoUrl?: string;
};

export type UserState = {
  user: User | null;
  isLogin: boolean;
  unRegisterObserver: firebase.Unsubscribe | null;
};

// createSlice() で actions と reducers を一気に生成
// https://scrapbox.io/frontend-akihito/Firebase_Auth_%E3%81%AEonAuthStateObserver%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6

const userSlice = createSlice({
  name: "users", //識別用の名前
  initialState: { user: null, isLogin: false } as UserState,
  reducers: {
    signIn: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    setUnRegisterObserver: (state, action) => {
      state.unRegisterObserver = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});

// 今回追加したgetRequestもエクスポートする
export const { signIn, signOut, setUnRegisterObserver } = userSlice.actions;

// RESTAPIの発行とgetRequestの呼び出しをする
export const signInAsync = () => {
  return async (dispatch: any) => {
    console.log("signInAsync");
    const unRegisterObserver = firebase.auth().onAuthStateChanged((user) => {
      // onAuthStateChanged
      console.log("stateChanged");
      if (user) {
        user.getIdToken().then((idToken: string) => {
          // promiseが戻り値のときはこういう書き方をする
          axios
            .get("http://localhost:3001/signin?id_token=" + idToken)
            .then((res) => {
              console.log(res);
              dispatch(
                signIn({
                  idToken: idToken as string,
                  displayName: user.displayName as string,
                  email: user.email as string,
                  photoUrl: user.photoURL as string,
                })
              );
            })
            .catch();
        });
      }
    });
    dispatch(setUnRegisterObserver(unRegisterObserver));
  };
};

export const signOutAsync = () => {
  return async (dispatch: any) => {
    console.log("signOutAsync");
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signOut());
      });
  };
};

export default userSlice.reducer;
