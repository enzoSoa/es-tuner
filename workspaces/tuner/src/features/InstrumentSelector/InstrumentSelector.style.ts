import {css} from "@emotion/react";
import {borderSize, colors, gapSize} from "../../ui";

export const dialogStyle = (offsetX: number, offsetY: number  ) => css`
  position: absolute;
  bottom: 50%;
  left: 75%;
  width: min(calc(50% - ${borderSize * 2}px - ${gapSize * 4}px), fit-content);
  transform: translate(calc(-50% + ${offsetX}px), calc(50% + ${offsetY}px));
  
  display: flex;
  flex-direction: column;
  padding: ${gapSize}px;
  gap: ${gapSize}px;
  
  background: ${colors.accent}99;
  box-shadow: ${offsetX}px ${offsetY}px 0 ${colors.primary};
  border: ${borderSize}px solid ${colors.primary};
  
  transition: transform 0.4s, filter 0.2s;
  filter: opacity(100%);

  & > * {
    transition: transform 0.1s 0.2s;
    transform-origin: left bottom;
  }

  @media (max-width: 768px) {
    bottom: 0;
    left: 0;
    width: calc(100% - ${borderSize * 2}px - ${gapSize * 2}px);
    transform-origin: bottom center;
  }
`;

export const folded = css`
  transform: translate(-50%, 50%) scale(2);
  filter: opacity(0);
  
  & > * {
    transition: transform 0.1s;
    transform: scaleX(0)
  }

  @media (max-width: 768px) {
    transform: scaleY(0);
  }
`;