import React, { FC } from "react";
import { CodeType } from "hooks/CodeAPIHooks/useFetchCodes";
import { Button } from "components/Button/Button";
import {
  BackBlur,
  BottomPanel,
  Close,
  CodeInput,
  CodeLabel,
  Container,
  Description,
  LeftPanel,
  Modal,
  RightPanel,
  Title,
  TitlePanel,
} from "./CodeSelectStyle";
import { CodeBlock } from "components/CodeBlock/CodeBlock";

interface CodeSelectProps {
  codeList: CodeType[];
  selected: CodeType | null;
  onSelect: (code: CodeType) => void;
  onClose: () => void;
  onReady: () => void;
  onStartToEdit: () => void;
  readyBtnDisabled: boolean;
  startToEditBtnDisabled: boolean;
}

export const CodeSelect: FC<CodeSelectProps> = ({
  codeList,
  selected,
  onClose,
  onSelect,
  onReady,
  onStartToEdit,
  readyBtnDisabled,
  startToEditBtnDisabled,
}) => {
  return (
    <>
      <BackBlur onClick={onClose} />
      <Modal>
        <TitlePanel>
          <Title>コードを選択</Title>
          <Description>対戦で使うコードを選ぼう</Description>
          <Close onClick={onClose}>✖</Close>
        </TitlePanel>
        <Container>
          <LeftPanel>
            {codeList.length == 0 ? (
              "コードが見つかりませんでした"
            ) : (
              <>
                {codeList.map((code, index) => (
                  <>
                    <CodeInput
                      type="radio"
                      name="codes"
                      value={index}
                      checked={selected != null && code.id == selected.id}
                      onChange={(e) => {
                        onSelect(codeList[Number(e.target.value)]);
                      }}
                      id={code.id}
                    />
                    <CodeLabel key={code.id} htmlFor={code.id}>
                      {code.codeContent}
                    </CodeLabel>
                  </>
                ))}
              </>
            )}
          </LeftPanel>
          <RightPanel>
            <CodeBlock
              code={selected ? selected.codeContent : ""}
              editorProps={{}}
              fontSize={18}
              height={546}
            />
          </RightPanel>
        </Container>
        <BottomPanel>
          <Button
            color="pink"
            icon={null}
            onClick={onStartToEdit}
            size="M2"
            status={startToEditBtnDisabled ? "disabled" : "default"}
            value="へんしゅう"
          />
          <Button
            color="blue"
            icon={null}
            onClick={() => {
              onReady();
              onClose();
            }}
            size="M2"
            status={readyBtnDisabled ? "disabled" : "default"}
            value="このコードで対戦する"
          />
        </BottomPanel>
      </Modal>
    </>
  );
};
