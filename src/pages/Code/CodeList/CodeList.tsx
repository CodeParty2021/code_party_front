import React from "react";
import { CodeCard } from "./components/CodeCard";
import { useCodeListState } from "./hooks/useCodeListState";

type Props = {};

export const CodeList: React.FC<Props> = () => {
  const { codes, loading, newCodeButtonHandler, deleteHandler } =
    useCodeListState();
  if (loading) {
    return <div>ロード中</div>;
  }
  return (
    <div>
      <h1>コード一覧</h1>
      <div>
        {codes.map((code) => {
          return (
            <CodeCard
              key={code.id}
              id={code.id}
              codeContent={code.codeContent}
              updatedAt={code.updatedAt}
              deleteHandler={deleteHandler}
            ></CodeCard>
          );
        })}
      </div>
      <button onClick={newCodeButtonHandler}>新しくコードを追加する</button>
    </div>
  );
};
