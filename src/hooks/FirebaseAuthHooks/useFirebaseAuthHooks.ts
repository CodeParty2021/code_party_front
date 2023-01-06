import { useNavigate } from "react-router";
import firebase from "firebase/compat/app";

import "firebase_config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInAsync } from "services/user/user";

type IResponse = {
  signInOfFirebase: (props: signInOfFirebaseProps) => Promise<void>;
  signInWithEmail: (props: singInWithEmailProps) => Promise<void>;
  createUserWithEmail: (props: singInWithEmailProps) => Promise<void>;
};
export type AccountServiceType = "google" | "email" | "facebook" | "twitter";

type signInOfFirebaseProps = {
  accountService: AccountServiceType;
  signInSuccessUrl?: string;
};

type singInWithEmailProps = {
  email: string;
  password: string;
};

export const useFirebaseAuth = (): IResponse => {
  const navigate = useNavigate();
  const auth = getAuth();

  const _signInOfFirebase = (props: signInOfFirebaseProps): Promise<void> => {
    const { accountService, signInSuccessUrl } = props;
    const provider =
      accountService == "google"
        ? new firebase.auth.GoogleAuthProvider()
        : accountService == "email"
        ? new firebase.auth.EmailAuthProvider()
        : accountService == "twitter"
        ? new firebase.auth.TwitterAuthProvider()
        : accountService == "facebook"
        ? new firebase.auth.FacebookAuthProvider()
        : undefined;

    return new Promise((resolve, reject): void => {
      if (typeof provider !== "undefined") {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            if (typeof signInSuccessUrl !== "undefined") {
              navigate(signInSuccessUrl, { replace: true });
            }
            resolve;
          })
          .catch((error) => {
            reject(error.message);
          });
      } else {
        reject("no accountService");
      }
    });
  };

  const _signInWithEmail = async (props: singInWithEmailProps) => {
    const { email, password } = props;

    const credential = await signInWithEmailAndPassword(auth, email, password);
    console.log("signInWithEmail", credential);
    await signInAsync(credential.user);
  };

  const _createUserWithEmail = async (props: singInWithEmailProps) => {
    const { email, password } = props;

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("createUserWithEmail", credential);
    await signInAsync(credential.user);
  };

  return {
    signInOfFirebase: _signInOfFirebase,
    signInWithEmail: _signInWithEmail,
    createUserWithEmail: _createUserWithEmail,
  };
};
