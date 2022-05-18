import { ReactSVG } from "react-svg";
import styled from "styled-components";
import { WHITE } from "styles/colors";

export const SetNameStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SetNameModal = styled.div`
  position: relative;
  width: 984px;
  height: 532px;

  background: linear-gradient(239.43deg, #f5f5f5 0.81%, #f7f4ff 100%);
  background-blend-mode: multiply;
  border: 8px solid ${WHITE};
  backdrop-filter: blur(8px);

  border-radius: 32px;
`;
export const ModalTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${WHITE};
  border-radius: 0px 0px 32px 0px;
`;
export const Balloon = styled(ReactSVG)``;
