import styled, { css } from "styled-components";
import { ReactSVG } from "react-svg";
import { avatar } from "styles/colors";

export type AvatarStyleProps = {
  color?: "default" | "turquoise" | "leaf" | "orange" | "pink" | "gray";
  type?: "user" | "anonymous" | "robot";
};

type PrivateProps = {
  imageUrl?: string;
};

export const AvatarDummyStyle = styled(ReactSVG)`
  display: block;
  width: 32px;
  height: 38px;
`;

const defaultStyle = css`
  display: block;
  width: 54px;
  height: 54px;
  /* ボーダーからはみ出ないように中身は1px内側に描画する */
  padding: 1px;

  position: relative;

  .avatar_main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${avatar.default.background};

    ${AvatarDummyStyle} {
      align-self: flex-end;
      fill: ${avatar.default.avatar};
    }

    .avatar_img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  /* ボーダーは上から重ねる */
  .avatar_circle {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    border: 3px solid ${avatar.default.border};
  }
`;

const turquoiseStyle = css`
  .avatar_main {
    background-color: ${avatar.turquoise.background};

    ${AvatarDummyStyle} {
      fill: ${avatar.turquoise.avatar};
    }
  }

  .avatar_circle {
    border-color: ${avatar.turquoise.border};
  }
`;

const leafStyle = css`
  .avatar_main {
    background-color: ${avatar.leaf.background};

    ${AvatarDummyStyle} {
      fill: ${avatar.leaf.avatar};
    }
  }

  .avatar_circle {
    border-color: ${avatar.leaf.border};
  }
`;

const orangeStyle = css`
  .avatar_main {
    background-color: ${avatar.orange.background};

    ${AvatarDummyStyle} {
      fill: ${avatar.orange.avatar};
    }
  }

  .avatar_circle {
    border-color: ${avatar.orange.border};
  }
`;

const pinkStyle = css`
  .avatar_main {
    background-color: ${avatar.pink.background};

    ${AvatarDummyStyle} {
      fill: ${avatar.pink.avatar};
    }
  }

  .avatar_circle {
    border-color: ${avatar.pink.border};
  }
`;

const grayStyle = css`
  border-color: ${avatar.gray.border};
  background-color: ${avatar.gray.background};
`;

const userStyle = css``;

const anonymousStyle = css`
  .avatar_main {
    background-color: ${avatar.anonymous.background};

    ${AvatarDummyStyle} {
      fill: ${avatar.anonymous.avatar};
    }
  }

  .avatar_circle {
    border-color: ${avatar.anonymous.border};
  }
`;

const imageStyle = css<PrivateProps>``;

const noImageStyle = css`
  .avatar_main {
    background: ${avatar.default.noImage.background};
  }
`;

const robotStyle = css`
  .avatar_main {
    background-color: ${avatar.robot.background};
  }

  .avatar_circle {
    border-color: ${avatar.robot.border};
  }
`;

export const AvatarStyle = styled.div<AvatarStyleProps & PrivateProps>`
  ${defaultStyle}

  ${({ color }) => color === "turquoise" && turquoiseStyle}
  ${({ color }) => color === "leaf" && leafStyle}
  ${({ color }) => color === "orange" && orangeStyle}
  ${({ color }) => color === "pink" && pinkStyle}

  ${({ imageUrl }) => imageUrl && imageStyle}
  ${({ color, imageUrl }) => color === "default" && !imageUrl && noImageStyle}

  ${({ type }) => type === "user" && userStyle}
  ${({ type }) => type === "anonymous" && anonymousStyle}
  ${({ type }) => type === "robot" && robotStyle}

  ${({ color }) => color === "gray" && grayStyle}
`;

AvatarStyle.defaultProps = {
  color: "default",
  type: "anonymous",
};
