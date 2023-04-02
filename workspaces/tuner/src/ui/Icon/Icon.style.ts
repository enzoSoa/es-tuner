import {css} from "@emotion/react";

export const iconStyle = (size?: number, color?: string) => css`
  fill: ${color || "#FFFFFF"};
  width: ${size || 32}px;
  max-height: ${size || 32}px;
`;