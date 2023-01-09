import { CodeType } from "hooks/CodeAPIHooks/useFetchCodes";
import { FC } from "react";
import React from "react";
import styled from "styled-components";
import { Button } from "components/Button/Button";

interface CodeSelectProps {
  codeList: CodeType[];
  selected: CodeType | null;
  onSelect: (code: CodeType) => void;
  onClose: () => void;
  onReady: () => void;
  readyBtnDisabled: boolean;
}

const BackBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(54, 62, 89, 0.2);
  backdrop-filter: blur(4px);
  z-index: 50;
  width: 100vw;
  height: 100vh;
`;
const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  z-index: 51;
  background: white;
`;

export const CodeSelect: FC<CodeSelectProps> = ({
  codeList,
  selected,
  onClose,
  onSelect,
  onReady,
  readyBtnDisabled,
}) => {
  return (
    <>
      <BackBlur onClick={onClose} />
      <Modal>
        {codeList.length == 0 ? (
          "コードが見つかりませんでした"
        ) : (
          <form>
            {codeList.map((code, index) => (
              <label key={code.id}>
                <input
                  type="radio"
                  name="codes"
                  value={index}
                  checked={selected != null && code.id == selected.id}
                  onChange={(e) => {
                    onSelect(codeList[Number(e.target.value)]);
                  }}
                />
                ステップ：{code.step}, 作成日：{code.createdAt}, 内容:{" "}
                {code.codeContent.slice(0, 10)}
                <br />
              </label>
            ))}
          </form>
        )}
        <Button
          color="green"
          icon={null}
          onClick={() => {
            onReady();
            onClose();
          }}
          size="M"
          status={readyBtnDisabled ? "disabled" : "default"}
          value="決定"
        />
      </Modal>
    </>
  );
};
