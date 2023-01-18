import Times from "components/icons/Times";
import React from "react";
import {
  IconButtonStyle,
  LogPanelStyle,
  LogPanelStyleProps,
  PlanetPictureStyle,
} from "./LogPanelStyle";

export type PanelState = "log" | "setting";
type Props = LogPanelStyleProps & {
  onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  state: PanelState;
};

export const LogPanel: React.FC<Props> = ({
  onCloseButtonClick,
  state,
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
        <span className="logpanel_title">{state}</span>
      </div>
      <div className="logpanel_container_main">{children}</div>
    </LogPanelStyle>
  );
};
