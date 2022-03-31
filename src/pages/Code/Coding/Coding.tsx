import React from "react";
import { Description } from "./components/Description/Description";

type Props = {};

export const CodeCoding: React.FC<Props> = () => {
  return (
    <div>
      <div>コーディング画面</div>
      <div>
        <Description />
      </div>
    </div>
  );
};
