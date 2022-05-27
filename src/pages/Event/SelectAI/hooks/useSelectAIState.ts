import { useCodeAPI } from "hooks/CodeAPIHooks/useCodeAPI";
import { EVENT1ON1_INIT_CODE } from "pages/Event/assets/InitCodes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isUser } from "services/user/user";
import { RootState } from "store";

export type IResponse = {
  loading: boolean;
  error: string | undefined;
  beginTrainHandler: (stepId: string) => void;
  backButtonHandler: () => void;
};

export const useSelectAIState = (): IResponse => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { loading, error, createCode, getCodesFilterStepIdAndUserId } =
    useCodeAPI();

  //該当ステップにユーザのコードが存在していればそれをロードするなければ新しく作ってそれをロードする
  const _beginTrainHandler = async (stepId: string) => {
    let codeId: string;
    if (isUser(user)) {
      const codes = await getCodesFilterStepIdAndUserId(stepId, user.id);
      if (codes.length >= 1) {
        codeId = codes[0].id;
      } else {
        const code = await createCode(EVENT1ON1_INIT_CODE, stepId, "1");
        codeId = code.id;
      }
      navigate(`/free-coding/${codeId}/`);
    }
  };

  const _backButtonHandler = () => {
    navigate(`/event/select-mode`);
  };

  return {
    loading: loading,
    error: error,
    beginTrainHandler: _beginTrainHandler,
    backButtonHandler: _backButtonHandler,
  };
};
