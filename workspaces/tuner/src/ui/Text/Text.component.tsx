import {ReactNode} from "react";
import {nonSelectable, textStyle} from "./Text.style";

export enum TextType {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p"
}

interface Props {
  color?: string;
  selectable?: boolean;
  type?: "h1" | "h2" | "h3" | "p";
  children: ReactNode;
}

export function TextComponent({color, selectable, type, children}: Props) {
  const classes = [textStyle(color), !selectable && nonSelectable];
  switch (type) {
    case "h1":
      return <h1 css={classes}>{children}</h1>;
    case "h2":
      return <h2 css={classes}>{children}</h2>;
    case "h3":
      return <h3 css={classes}>{children}</h3>;
  }
  return <p css={classes}>{children}</p>;
}