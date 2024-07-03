import Times from "components/icons/Times";
import React, { ReactNode, forwardRef, useImperativeHandle } from "react";
import {
  IconButtonStyle,
  LogPanelStyle,
  LogPanelStyleProps,
  PlanetPictureStyle,
} from "./LogPanelStyle";
import { LogPanelRef, useLogPanel } from "./hooks/useLogPanel";

export type PanelState = "log" | "setting";
type Props = LogPanelStyleProps & {
  onCloseButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  state: PanelState;
  children?: ReactNode;
};

export const LogPanel = forwardRef<LogPanelRef, Props>(function LogPanel(
  { onCloseButtonClick, state, children, ...styleProps },
  ref
) {
  const { scrollRef, scrollTo } = useLogPanel();

  useImperativeHandle(
    ref,
    () => ({
      scrollTo,
    }),
    [scrollTo]
  );

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
      <div className="logpanel_container_main" ref={scrollRef}>
        {children}
      </div>
    </LogPanelStyle>
  );
});
