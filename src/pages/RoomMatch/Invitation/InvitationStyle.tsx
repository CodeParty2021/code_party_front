import styled from "styled-components";
import { GRAY_80, GRAY_90, WHITE } from "styles/colors";

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

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  z-index: 51;
  background: ${WHITE};

  box-shadow: 0px 4px 16px -2px rgba(40, 45, 62, 0.1);
  border-radius: 32px;
  padding: 32px 40px 32px;

  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 1200px;
`;

export const Description = styled.div`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  font-feature-settings: "palt" on;
  color: ${GRAY_90};
`;
export const Title = styled.div`
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */

  font-feature-settings: "palt" on;
  color: ${GRAY_90};

  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;
