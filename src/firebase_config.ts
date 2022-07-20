// TODO:compat系はv8のライブラリをv9で動かす為のものなので、v8系の処理をなくせたら消したい
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { firebaseConfig } from "config";

//firebaseの初期化
firebase.initializeApp(firebaseConfig);

export const getIdToken = async () => {
  return getAuth().currentUser?.getIdToken();
};

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  connectAuthEmulator(getAuth(), "http://localhost:9099");
  connectDatabaseEmulator(getDatabase(getApp()), "localhost", 9000);
}
