import {css} from "@emotion/react";
import {borderSize, colors, gapSize} from "../../ui";

export const logoStyle = css`
  display: flex;
  align-items: center;
  gap: ${gapSize}px;
`;

export const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${gapSize}px;
  border-bottom: ${borderSize}px solid ${colors.primary};
`;