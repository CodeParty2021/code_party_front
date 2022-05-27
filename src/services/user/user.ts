import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import axios, { AxiosResponse } from "axios";
import { uri } from "config";
import {
  getAuth,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from "firebase/auth";
export type User = {
  id: string;
  displayName: string;
  email?: string;
  picture?: string;
  jwt: string; //これをheaderに入れてAPIやり取りする。
  isAnonymous: boolean;
};

export type LoginUserState = {
  user: User | null;
  isLogin: boolean;
  unRegisterObserver: firebase.Unsubscribe | null; // ログイン監視用のobserverのkill用メソッド
};

type UserAuthResponse = {
  // レスポンスの型
  userInfo: {
    displayName: string;
    email?: string | null;
    id: string;
    picture?: string | null;
  };
  isCreated: boolean;
};

type signInAction = { type: string; payload: User };
type setUnRegisterObserverAction = {
  type: string;
  payload: firebase.Unsubscribe;
};

const isUserAuthResponse = (data: any): data is UserAuthResponse => {
  return data !== undefined;
};
// createSlice() で actions と reducers を一気に生成
// https://scrapbox.io/frontend-akihito/Firebase_Auth_%E3%81%AEonAuthStateObserver%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6

const userSlice = createSlice({
  name: "users", //識別用の名前
  initialState: { user: null, isLogin: false } as LoginUserState,
  reducers: {
    signIn: (state, action: signInAction) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    setUnRegisterObserver: (state, action: setUnRegisterObserverAction) => {
      state.unRegisterObserver = action.payload;
    },
    signOut: (state) => {
      state.isLogin = false;
      state.user = null;
    },
    updateUserDisplayName: (state, action: PayloadAction<string>) => {
      if (isUser(state.user)) {
        state.user.displayName = action.payload;
      } else {
        console.log("userReduxError: No user in updateDisplayName");
      }
    },
  },
});

// 今回追加したgetRequestもエクスポートする
export const { signIn, signOut, setUnRegisterObserver, updateUserDisplayName } =
  userSlice.actions;

export function isUser(user: User | null): user is User {
  return user?.id !== undefined;
}

// RESTAPIの実行とgetRequestの呼び出しをする
export const signInAsync = (user: FirebaseUser) => {
  //dispatch関数を返す
  return async (dispatch: any) => {
    user.getIdToken().then((idToken: string) => {
      // promiseが戻り値のときはこういう書き方をする
      axios
        .get(uri + "/users/auth", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + idToken,
          },
        })
        .then((res: AxiosResponse<UserAuthResponse>) => {
          if (isUserAuthResponse(res.data)) {
            const userInfo = res.data.userInfo;
            dispatch(
              signIn({
                id: userInfo.id,
                displayName: userInfo.displayName,
                email: userInfo.email ? userInfo.email : undefined,
                picture: userInfo.picture ? userInfo.picture : undefined,
                jwt: idToken,
                isAnonymous: user.isAnonymous,
              })
            );
            if (res.data.isCreated) {
              console.log("サインイン");
              console.log(idToken);
              //TODO: サインイン時の処理を書く
            } else {
              console.log("ログイン");
              console.log(idToken);
              //TODO: ログイン時の処理を書く
            }
          }
        })
        .catch();
    });
  };
};

export const signOutAsync = () => {
  return async (dispatch: any) => {
    firebaseSignOut(getAuth()).then(() => {
      dispatch(signOut());
    });
  };
};

export const setCallBackToSyncUser = () => {
  return async (dispatch: any) => {
    const observer = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        console.log(user);
        dispatch(signInAsync(user));
      }
    });
    dispatch(setUnRegisterObserver(observer));
  };
};

export default userSlice.reducer;
