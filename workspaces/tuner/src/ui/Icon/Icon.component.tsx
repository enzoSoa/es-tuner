import {iconStyle} from "./Icon.style";
import {ReactElement} from "react";

export enum IconSize {
  MEDIUM = 32,
  LARGE = 48,
}

interface Props {
  icon: ReactElement<SVGElement>;
  color?: string;
  size?: number;
}

export function IconComponent({icon, color, size}: Props) {
  const classes = [iconStyle(size, color)];
  return <div css={classes}>{icon}</div>;
}