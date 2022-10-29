import { AlgoHeadStyle } from "components/Character/Algo/Head/AlgoHeadStyle";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { avatar } from "styles/colors";

export type AvatarStyleProps = {
  color?: "default" | "turquoise" | "leaf" | "orange" | "pink";
  type?: "user" | "anonymous" | "robot";
};

type PrivateProps = {
  imageUrl?: string;
};

export const AvatarDummyStyle = styled(ReactSVG)`
  width: 32px;
  height: 38px;
`;

const defaultStyle = css`
  display: block;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 3px solid ${avatar.default.border};
  background-color: ${avatar.default.background};
  background-size: cover;

  overflow: hidden;

  position: relative;

  ${AvatarDummyStyle} {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }

  ${AlgoHeadStyle} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const turquoiseStyle = css`
  border-color: ${avatar.turquoise.border};
  background-color: ${avatar.turquoise.background};
`;

const leafStyle = css`
  border-color: ${avatar.leaf.border};
  background-color: ${avatar.leaf.background};
`;

const orangeStyle = css`
  border-color: ${avatar.orange.border};
  background-color: ${avatar.orange.background};
`;

const pinkStyle = css`
  border-color: ${avatar.pink.border};
  background-color: ${avatar.pink.background};
`;

const userStyle = css``;

const anonymousStyle = css`
  border-color: ${avatar.default.border};
  background-color: ${avatar.default.background};
  ${AvatarDummyStyle} {
    fill: ${avatar.anonymous.avatar};
  }
`;

const imageStyle = css<PrivateProps>`
  background-image: url(${({ imageUrl }) => imageUrl});
`;

const noImageStyle = css`
  ${AvatarDummyStyle} {
    fill: ${avatar.noImage.avatar};
  }
`;

const robotStyle = css`
  border-color: ${avatar.robot.border};
  background-color: ${avatar.robot.background};
`;

export const AvatarStyle = styled.div<AvatarStyleProps & PrivateProps>`
  ${defaultStyle}

  ${({ color }) => color === "turquoise" && turquoiseStyle}
  ${({ color }) => color === "leaf" && leafStyle}
  ${({ color }) => color === "orange" && orangeStyle}
  ${({ color }) => color === "pink" && pinkStyle}

  ${({ imageUrl }) => imageUrl && imageStyle}
  ${({ imageUrl }) => !imageUrl && noImageStyle}

  ${({ type }) => type === "user" && userStyle}
  ${({ type }) => type === "anonymous" && anonymousStyle}
  ${({ type }) => type === "robot" && robotStyle}
`;

AvatarStyle.defaultProps = {
  color: "default",
  type: "anonymous",
};
