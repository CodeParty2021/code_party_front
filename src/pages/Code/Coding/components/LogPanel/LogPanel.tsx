import Times from "components/icons/Times";
import React from "react";
import {
  IconButtonStyle,
  LogPanelStyle,
  LogPanelStyleProps,
  PlanetPictureStyle,
} from "./LogPanelStyle";

type Props = LogPanelStyleProps & {
  onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const LogPanel: React.FC<Props> = ({
  onCloseButtonClick,
  children,
  ...styleProps
}) => {
  return (
    <LogPanelStyle {...styleProps}>
      <div className="logpanel_smoke" />
      <div className="logpanel_container_title">
        <div className="logpanel_container_close">
          <PlanetPictureStyle color="blue" size="87px" />
          <IconButtonStyle Icon={Times} onClick={onCloseButtonClick} />
        </div>
        <span className="logpanel_title">LOG</span>
      </div>
      <div className="logpanel_container_main">{children}</div>
    </LogPanelStyle>
  );
};
