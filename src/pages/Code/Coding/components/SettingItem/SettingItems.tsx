import React, { Fragment } from "react";
import styled from "styled-components";
import { BLUE_50 } from "styles/colors";

type RobotProperty = {
  step: number;
  name: string;
};
type Props = {
  robotProperty: RobotProperty[];
  stepChange: (step: number) => void;
  selected: number;
};

const CodeLabel = styled.label`
  display: block;
  height: 56px;
  padding: 0 32px 0;
  width: 100%;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 50px;
  width: 100%;
  /* identical to box height, or 27px */
  /* BLUE_60 */
  color: #545eed;
  border: 3px solid #eaebf1;
  border-radius: 12px;
  overflow: hidden;
  background: white;
`;
export const CodeInput = styled.input`
  display: none;
  &:checked + label {
    border: 3px solid ${BLUE_50};
  }
`;

export const SettingItems: React.FC<Props> = ({
  robotProperty,
  stepChange,
  selected,
}) => {
  return (
    <>
      {robotProperty.map((robot, index) => (
        <Fragment key={index}>
          <CodeInput
            type="radio"
            name="codes"
            value={robot.step}
            checked={selected == robot.step}
            onChange={() => {
              stepChange(robot.step);
            }}
            id={robot.step + ""}
          />
          <CodeLabel key={robot.step} htmlFor={robot.step + ""}>
            {robot.name}
          </CodeLabel>
        </Fragment>
      ))}
    </>
  );
};
