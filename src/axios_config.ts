import axios, { Axios } from "axios";
import { uri, microCMSConfig } from "config";
import { getIdToken } from "firebase_config";

// APIへのアクセスだけなのでjsonに絞る
const frontendApi: Axios = axios.create({
  baseURL: uri,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// アクセスの度に実行される
frontendApi.interceptors.request.use(
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

// APIへのアクセスだけなのでjsonに絞る

const microCMSApi: Axios = axios.create({
  baseURL: microCMSConfig.uri,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-MICROCMS-API-KEY": microCMSConfig.apiKey as string,
  },
});

export const axiosWithIdToken = frontendApi;
export const axiosMicroCMS = microCMSApi;
