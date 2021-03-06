import React from "react";
import { CodeCard } from "../components/CodeCard";
import { useFetchCodes } from "./hooks/getCodesHooks";

type Props = {};

type Code = {
  id: string;
  codeContent: string;
  language: string;
  updatedAt: string;
  createdAt: string;
  user: string;
  step: string;
};

export const CodeList: React.FC<Props> = () => {
  const { codes, loading, newCodeButtonHandler } = useFetchCodes();
  if (loading) {
    return <div>ロード中</div>;
  }
  if (codes) {
    return (
      <div>
        <h1>コード一覧</h1>
        <div>
          {codes.map((code: Code) => {
            return (
              <CodeCard
                key={code.id}
                id={code.id}
                codeContent={code.codeContent}
                updatedAt={code.updatedAt}
              ></CodeCard>
            );
          })}
        </div>
        <button onClick={newCodeButtonHandler}>新しくコードを追加する</button>
      </div>
    );
  } else {
    return <div>ログインが必要です</div>;
  }
};
