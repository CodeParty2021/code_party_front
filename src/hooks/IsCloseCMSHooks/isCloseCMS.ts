import { AxiosError, AxiosResponse } from "axios";
import { axiosMicroCMS } from "axios_config";

export type IResponse = {
  getIsClose: () => Promise<boolean>;
};

export type CMSResponse = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  isClose: boolean;
};

export const useIsCloseCMS = (): IResponse => {
  /**
   * サイトをクローズにするかどうかを取得する
   */
  const getIsClose = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      axiosMicroCMS
        .get("/is-close")
        .then((response: AxiosResponse<CMSResponse>) => {
          return resolve(response.data.isClose);
        })
        .catch((error: AxiosError) => {
          return reject(new Error(`CMS ERROR: ${error}`));
        });
    });
  };

  return {
    getIsClose,
  };
};
