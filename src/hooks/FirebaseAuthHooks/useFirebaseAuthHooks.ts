import { useNavigate } from "react-router";
import firebase from "firebase/compat/app";

import "firebase_config";

type IResponse = {
  signInOfFirebase: (props: signInOfFirebaseProps) => Promise<void>;
};
export type AccountServiceType = "google" | "email" | "facebook" | "twitter";

type signInOfFirebaseProps = {
  accountService: AccountServiceType;
  signInSuccessUrl?: string;
};

export const useFirebaseAuth = (): IResponse => {
  const navigate = useNavigate();
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

  return {
    signInOfFirebase: _signInOfFirebase,
  };
};
