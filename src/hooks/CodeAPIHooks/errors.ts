export const CODE_API_ERROR_CODES = [
  "invalid_parameter", // 不正なパラメータ
  "no_resource", // リソースが見つからなかった
  "no_select_func", // select関数が見つからなかった
  "user_code_error", // ユーザコードで何かしらのエラーが発生した
  "code_count_shortage", // 必要なコード数が足りない
] as const;

export type CodeAPIErrorResponseType = {
  data: {
    errorCode: typeof CODE_API_ERROR_CODES[number];
    detail?: string;
  };
};

export const isCodeAPIErrorResponseType = (
  instance: any
): instance is CodeAPIErrorResponseType => {
  return (
    !!instance &&
    "data" in instance &&
    "errorCode" in instance["data"] &&
    CODE_API_ERROR_CODES.includes(instance["data"]["errorCode"])
  );
};
