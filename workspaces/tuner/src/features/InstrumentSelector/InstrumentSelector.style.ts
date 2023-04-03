import {css} from "@emotion/react";

const borderSize = 2;
const gapSize = 24;

export const dialogStyle = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  
  display: flex;
  flex-direction: column;
  padding: ${gapSize}px;
  gap: 24px;
  
  backdrop-filter: blur(10px);
  border: ${borderSize}px solid #FFFFFF;
`;