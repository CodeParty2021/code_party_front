import React from "react";
import styled from "styled-components";

type Props = {
  id: string;
  codeContent: string;
  updatedAt: string;
};

const Card = styled.div`
  background-color: gray;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 600px;
  color: white;
`;

export const CodeCard: React.FC<Props> = (props: Props) => {
  return (
    <Card>
      <pre>{props.codeContent}</pre>
      <p>UpdatedAt:{props.updatedAt} </p>
    </Card>
  );
};
