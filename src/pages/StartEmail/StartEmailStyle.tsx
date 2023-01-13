import styled from "styled-components";
import { WHITE } from "styles/colors";
import { FONT } from "styles/constants/constants";

export const BackLinkPosition = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
`;

export const TextInput = styled.input`
  width: 453px;
  height: 64px;
  background: ${WHITE};
  border-radius: 8px;
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  color: #2a2c33;
  margin-bottom: 32px;
`;
