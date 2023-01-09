import styled from "styled-components";
import { BLUE_50, GRAY_40 } from "styles/colors";

export const BackBlur = styled.div`
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
export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  z-index: 51;
  background: #ffffff;

  box-shadow: 0px 4px 16px -2px rgba(40, 45, 62, 0.1);
  border-radius: 32px;
  padding: 32px 40px 32px;

  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  min-width: 1200px;
`;

export const LeftPanel = styled.form`
  width: 50%;
  display: flex;
  overflow: auto;
  flex-direction: column;
  gap: 8px 8px;
`;
export const RightPanel = styled.div`
  width: 50%;
`;
export const TitlePanel = styled.div`
  width: 100%;
  position: relative;
  padding: 0 16px 0 0;
`;
export const Description = styled.div`
  display: inline-block;
  padding: 0 0 0 16px;
  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  font-feature-settings: "palt" on;

  /* GRAY_90 */

  color: #363e59;
`;
export const Container = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  height: 546px;
`;
export const Title = styled.div`
  display: inline-block;

  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  /* identical to box height */

  font-feature-settings: "palt" on;

  /* GRAY_90 */

  color: #363e59;

  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;

export const CodeLabel = styled.label`
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
`;
export const CodeInput = styled.input`
  display: none;
  &:checked + label {
    border: 3px solid ${BLUE_50};
  }
`;

export const BottomPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
export const Close = styled.div`
  position:absolute;
  top:0;
  right:0;
  font-weight: 400;
  font-size: 18px;
  color=${GRAY_40};
  cursor:pointer;
`;
