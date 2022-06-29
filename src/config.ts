//config.jsでの環境構築はこれがわかりやすい
// https://qiita.com/zgmf_mbfp03/items/008436c5749d65f96e55
// 環境変数を整えている

const Config = () => {
  if (process.env.NODE_ENV === "test") {
    // test
    return {
      firebase: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APPID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      },
      uri: process.env.REACT_APP_TEST_URI,
      microCMS: {
        apiKey: process.env.REACT_APP_MICROCMS_API_KEY,
        uri: process.env.REACT_APP_MICROCMS_URI_V1,
      },
    };
  } else if (process.env.NODE_ENV === "production") {
    // production
    return {
      firebase: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APPID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      },
      uri: process.env.REACT_APP_PRO_URI,
      microCMS: {
        apiKey: process.env.REACT_APP_MICROCMS_API_KEY,
        uri: process.env.REACT_APP_MICROCMS_URI_V1,
      },
    };
  }
  // development
  return {
    firebase: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APPID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    },
    uri: process.env.REACT_APP_DEV_URI,
    microCMS: {
      apiKey: process.env.REACT_APP_MICROCMS_API_KEY,
      uri: process.env.REACT_APP_MICROCMS_URI_V1,
    },
  };
};

export const firebaseConfig = Config().firebase;
export const uri = Config().uri;
export const microCMSConfig = Config().microCMS;
