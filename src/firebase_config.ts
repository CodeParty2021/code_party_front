import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { firebaseConfig } from "config";
import { getAuth } from "firebase/auth";

//firebaseの初期化
firebase.initializeApp(firebaseConfig);

export const getIdToken = async () => {
  return getAuth().currentUser?.getIdToken();
};
