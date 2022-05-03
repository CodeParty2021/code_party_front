import { useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { EVENT1ON1_INIT_CODE } from "pages/Event/assets/InitCodes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isUser } from "services/user/user";
import { RootState } from "store";

const EVENT1ON1_STEP_ID = "2";
export type IResponse = {
  loading: boolean;
  error: string | undefined;
  beginTrainHandler: () => void;
};

export const useSelectModeState = (): IResponse => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const { loading, error, createCode, getCodesFilterStepIdAndUserId } =
    useCodeAPI();
  //該当ステップにユーザのコードが存在していればそれをロードするなければ新しく作ってそれをロードする
  const _beginTrainHandler = async () => {
    console.log(_beginTrainHandler);
    let codeId: string;
    console.log("isUser(user)", isUser(user));
    console.log(user);
    if (isUser(user)) {
      const codes = await getCodesFilterStepIdAndUserId(
        EVENT1ON1_STEP_ID,
        user.id
      ); //TODO エラー処理
      console.log("getCodesFilterStepIdAndUserId", codes);
      if (codes.length >= 1) {
        codeId = codes[0].id;
      } else {
        const code = await createCode(
          EVENT1ON1_INIT_CODE,
          EVENT1ON1_STEP_ID,
          "1"
        );
        console.log("createCode:" + JSON.stringify(code));
        codeId = code.id;
      }

      navigate(`/free-coding/${codeId}/`);
    }
  };
  return {
    loading: loading,
    error: error,
    beginTrainHandler: _beginTrainHandler,
  };
};
