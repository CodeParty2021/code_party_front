import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";

import { firebaseConfig } from "config";

//firebaseの初期化
firebase.initializeApp(firebaseConfig);

//database
export const auth = getAuth();
export const db = getDatabase();
