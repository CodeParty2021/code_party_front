import styled from "styled-components";
import { GRAY_80, WHITE } from "styles/colors";

export const SignInButton = styled.button`
  width: 306px;
  background-color: ${WHITE};
  display: flex;
  margin: 4px;
  height: 56px;
  border-radius: 8px;
  text-align: left;
  text-align: center;
  padding: 12px 32px;
`;

export const IconArea = styled.div`
  display: block;
  margin: auto 24px auto 0;
  height: 24px;
  text-align: center;
`;

export const ButtonText = styled.p`
  margin: auto auto auto 0;
  font-weight: 700;
  color: ${GRAY_80};
`;
