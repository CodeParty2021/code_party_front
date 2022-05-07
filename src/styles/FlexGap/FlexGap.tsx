import { css } from "styled-components";
import { Properties } from "csstype";

export type FlexGapProps = {
  /**
   * 縦方向と横方向のアキを設定する
   */
  gap: Properties["gap"];
  /**
   * flexの方向を指定
   */
  direction?: Properties["flexDirection"];
};

/**
 * FlexBoxとGridレイアウトのアキを設定する
 * - flex-gapに対応していない場合，代用としてmarginを設定
 *   - この場合はwrapに対応していないので注意
 */
export const FlexGap = ({ gap, direction = "column" }: FlexGapProps) => css`
  gap: ${gap};

  @supports not (gap: ${gap}) {
    & > *:not(:first-child) {
      ${direction == "column"
        ? `margin-top: ${gap}`
        : direction == "row" && `margin-left: ${gap}`}
    }
  }
`;
