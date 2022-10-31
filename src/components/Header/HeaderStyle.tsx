import styled from "styled-components";
import { GRAY_10, GRAY_30, GRAY_90 } from "styles/colors";

export const HeaderStyle = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${GRAY_10};
  border-bottom: 1px solid ${GRAY_30};
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 3;
`;

export const LogoStyle = styled.img`
  width: 178px;
  height: 81px;
  left: calc(50% - 178px / 2);
  top: 15px;
  position: fixed;
  z-index: 5;
`;

export const HeaderCircleStyle = styled.img`
  position: fixed;
  top: 78px;
  left: calc(50% - 232px / 2);
  width: 232px;
  height: 42px;
  z-index: 4;
`;

export const BackLinkArea = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 32px;
`;

export const BackButtonText = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: ${GRAY_90};
  margin-left: 16px;
`;
