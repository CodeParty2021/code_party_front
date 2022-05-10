import axios, { Axios } from "axios";
import { uri } from "config";
import { getIdToken } from "firebase_config";

axios.defaults.baseURL = uri;

// APIへのアクセスだけなのでjsonに絞る
const instance: Axios = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// アクセスの度に実行される
instance.interceptors.request.use(
  async (config) => {
    //tokenを取得
    const token = await getIdToken();
    //tokenをヘッダーに設定
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      if (config.headers) delete config.headers["Authorization"];
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export const axiosWithIdToken = instance;
