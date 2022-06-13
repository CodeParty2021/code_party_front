import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { axiosMicroCMS } from "axios_config";
import { useStageAPI } from "hooks/StageAPIHooks/useStageAPI";
import { useWorldAPI } from "hooks/WorldAPIHooks/useWorldAPI";
import { useStepAPI } from "hooks/StepAPIHooks/useStepAPI";

export type IResponse = {
  error: string | undefined;
  loading: boolean;
  getDescription: (
    worldIndex: number,
    stageIndex: number,
    stepIndex: number
  ) => Promise<DescriptionCMSType>;
  getDescriptionFromStepID: (stepId: number) => Promise<DescriptionCMSType>;
};

export type DescriptionCMSsType = {
  contents: DescriptionCMSType[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type DescriptionCMSType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  revisedAt: Date;
  stageIndex: number;
  stepIndex: number;
  body: Array<BodyType | HintBoxType>;
};
export type BodyType = {
  fieldId: string;
  html: string;
};
export type HintBoxType = {
  fieldId: string;
  title: string;
  body: string;
};

export type GetDescriptionResponseType = DescriptionCMSType;

export const useDescriptionCMS = (): IResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const { error: errorUseStepAPI, getStep } = useStepAPI();
  const { error: errorUseStageAPI, getStage } = useStageAPI();
  const { error: errorUseWorldAPI, getWorld } = useWorldAPI();

  useEffect(() => {
    if (errorUseStepAPI || errorUseStageAPI || errorUseWorldAPI) {
      setError(`${errorUseStepAPI}: ${errorUseStageAPI}: ${errorUseWorldAPI}`);
    } else {
      setError(undefined);
    }
  }, [errorUseStageAPI, errorUseWorldAPI]);

  /**
   * DescriptionをCMSから取得する. 1つのみを返す。複数ヒットした場合やヒットしなかった場合はerrorを返す。
   * @param {number} worldIndex ワールド番号
   * @param {number} stageIndex ステージ番号
   * @param {number} stepIndex ステップ番号
   */
  const getDescription = (
    worldIndex: number,
    stageIndex: number,
    stepIndex: number
  ): Promise<GetDescriptionResponseType> => {
    return new Promise((resolve, reject) => {
      setError(undefined);
      setLoading(true);
      axiosMicroCMS
        .get(
          `/step-description?filters=worldIndex[equals]${worldIndex}[and]stageIndex[equals]${stageIndex}[and]stepIndex[equals]${stepIndex}`
        )
        .then((response: AxiosResponse<DescriptionCMSsType>) => {
          setLoading(false);
          if (response.data.totalCount == 1) {
            console.log(response.data.contents[0]);
            return resolve(response.data.contents[0]);
          } else {
            return reject(
              new Error(
                "GetDescriptionError StageIndex or StepIndex is invalid"
              )
            );
          }
        })
        .catch((error: AxiosError) => {
          setLoading(false);
          return reject(new Error(`GetDescriptionError ${error}`));
        });
    });
  };

  /**
   * DescriptionをCMSから取得する. 1つのみを返す。複数ヒットした場合やヒットしなかった場合はerrorを返す。
   * @param {number} stepId ステップID
   */
  const getDescriptionFromStepID = (
    stepId: number
  ): Promise<GetDescriptionResponseType> => {
    return getStep(stepId) // stageAPIを叩く。Promiseが返される
      .then((step) => getStage(step.stage))
      .then(async (stage) => {
        const world = await getWorld(stage.world); // worldAPIをたたく。Promiseが返される
        return { stage, world };
      })
      .then(({ stage, world }) => {
        console.log(world.id, stage.id, stepId);
        return getDescription(world.id, stage.id, stepId); // descriptionCMSAPIを叩く。Promiseが返される
      });
  };
  return {
    loading,
    error,
    getDescription,
    getDescriptionFromStepID,
  };
};
