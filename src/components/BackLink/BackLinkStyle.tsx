import styled from "styled-components";
import { GRAY_90 } from "styles/colors";
import { backLink } from "styles/colors";

export const BackButtonText = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: ${GRAY_90};
  margin-left: 16px;
`;

export const BackLinkButton = styled.button`
  display: flex;
  align-items: center;
`;

export const CircleArea = styled.div`
  padding: 12px;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: ${backLink.bg};
`;
