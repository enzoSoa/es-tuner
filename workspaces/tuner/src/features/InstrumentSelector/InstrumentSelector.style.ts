import {css} from "@emotion/react";
import {borderSize, gapSize} from "../../ui";

export const dialogStyle = css`
  position: absolute;
  bottom: 50%;
  left: calc(50% + ${gapSize}px);
  width: calc(50% - ${borderSize * 2}px - ${gapSize * 4}px);
  
  display: flex;
  flex-direction: column;
  padding: ${gapSize}px;
  gap: ${gapSize}px;
  
  backdrop-filter: blur(10px);
  border: ${borderSize}px solid #FFFFFF;
  
  @media (max-width: 768px) {
    bottom: 0;
    left: 0;
    width: calc(100% - ${borderSize * 2}px - ${gapSize * 2}px);
  }
`;

export const foldable = css`
  transition: transform 0.1s 0.1s;
  
  & > * {
    transition: transform 0.1s 0.2s;
    transform-origin: left bottom;
  }
  
  @media (max-width: 768px) {
    transform-origin: bottom center;
  }
`;

export const folded = css`
  transform: scale(0);
  transition: transform 0.1s 0.1s;
  
  & > * {
    transition: transform 0.1s;
    transform: scaleX(0)
  }

  @media (max-width: 768px) {
    transform: scaleY(0%);
  }
`;