import React from "react";
import { Link } from "react-router-dom";
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
  const { data, loading } = useFetchCodes();
  if (loading) {
    return <div>ロード中</div>;
  }
  if (data) {
    return (
      <div>
        <h1>コード一覧</h1>
        <div>
          {data.map((code: Code) => {
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
        <Link to="/free-coding">新しくコードを追加する</Link>
      </div>
    );
  } else {
    return <div>ログインが必要です</div>;
  }
};
