import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { axiosMicroCMS } from "axios_config";
import { useStageAPI } from "hooks/StageAPIHooks/useStageAPI";
import { useWorldAPI } from "hooks/WorldAPIHooks/useWorldAPI";
import { useStepAPI } from "hooks/StepAPIHooks/useStepAPI";

export type IResponse = {
  error: string | undefined;
  getDescription: (
    worldIndex: number,
    stageIndex: number,
    stepIndex: number
  ) => Promise<DescriptionCMSType | undefined>;
  getDescriptionFromStepID: (
    stepId: number
  ) => Promise<DescriptionCMSType | undefined>;
};

export type DescriptionCMSsType = {
  contents: DescriptionCMSType[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type DescriptionCMSType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  worldIndex: 1;
  stageIndex: number;
  stepIndex: number;
  body: Array<Element>;
};
export type Element = BodyType | HintBoxType | TableType | ClearConditionType;

export type BodyType = {
  fieldId: string;
  html: string;
};
export type HintBoxType = {
  fieldId: string;
  title: string;
  body: string;
};
export type TableType = {
  fieldId: string;
  body: string;
};
export type TextType = {
  fieldId: string;
  text: string;
};
export type ClearConditionType = {
  fieldId: string;
  condition: TextType[];
};

export type GetDescriptionResponseType = DescriptionCMSType;

export const useDescriptionCMS = (): IResponse => {
  const [error, setError] = useState<string | undefined>();
  const { error: errorUseStepAPI, getStep } = useStepAPI();
  const { error: errorUseStageAPI, getStage } = useStageAPI();
  const { error: errorUseWorldAPI, getWorld } = useWorldAPI();
  const [errorDescription, setErrorDescription] = useState<
    string | undefined
  >();
  useEffect(() => {
    const errors = [
      errorDescription,
      errorUseStepAPI,
      errorUseStageAPI,
      errorUseWorldAPI,
    ];
    const errorStr = errors.filter((error) => error).join(", ");
    setError(errorStr ? errorStr : undefined);
  }, [errorDescription, errorUseStepAPI, errorUseStageAPI, errorUseWorldAPI]);

  /**
   * Description???CMS??????????????????. 1????????????????????????????????????????????????????????????????????????????????????error????????????
   * @param {number} worldIndex ??????????????????
   * @param {number} stageIndex ??????????????????
   * @param {number} stepIndex ??????????????????
   */
  const getDescription = (
    worldIndex: number,
    stageIndex: number,
    stepIndex: number
  ): Promise<GetDescriptionResponseType | undefined> => {
    return new Promise((resolve, reject) => {
      setError(undefined);
      axiosMicroCMS
        .get(
          `/step-description?filters=worldIndex[equals]${worldIndex}[and]stageIndex[equals]${stageIndex}[and]stepIndex[equals]${stepIndex}`
        )
        .then((response: AxiosResponse<DescriptionCMSsType>) => {
          if (response.data.totalCount == 1) {
            return resolve(response.data.contents[0]);
          } else {
            console.log({ response });
            console.log(response.data.totalCount);
            setErrorDescription("GetStepResponseError Index is invalid");
            return resolve(undefined);
          }
        })
        .catch((error: AxiosError) => {
          setErrorDescription(`GetStepResponseError ${error}`);
          return reject(new Error(`GetDescriptionError ${error}`));
        });
    });
  };

  /**
   * Description???CMS??????????????????. 1????????????????????????????????????????????????????????????????????????????????????error????????????
   * @param {number} stepId ????????????ID
   */
  const getDescriptionFromStepID = (
    stepId: number
  ): Promise<GetDescriptionResponseType | undefined> => {
    return getStep(stepId) // stageAPI????????????Promise???????????????
      .then((step) => getStage(step.stage))
      .then(async (stage) => {
        const world = await getWorld(stage.world); // worldAPI???????????????Promise???????????????
        return { stage, world };
      })
      .then(({ stage, world }) => {
        return getDescription(world.id, stage.id, stepId); // descriptionCMSAPI????????????Promise???????????????
      });
  };
  return {
    error,
    getDescription,
    getDescriptionFromStepID,
  };
};

export const isBodyType = (target: Element): target is BodyType => {
  return target.fieldId == "body";
};
export const isHintBoxType = (target: Element): target is HintBoxType =>
  target.fieldId == "hintBox";
export const isTableType = (target: Element): target is TableType =>
  target.fieldId == "table";
export const isClearConditionType = (
  target: Element
): target is ClearConditionType => target.fieldId == "clearCondition";
