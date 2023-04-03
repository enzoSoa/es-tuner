import {css} from "@emotion/react";
import {colors} from "../vars";

export const iconStyle = (size?: number, color?: string) => css`
  fill: ${color || colors.primary};
  width: ${size || 32}px;
  max-height: ${size || 32}px;
`;