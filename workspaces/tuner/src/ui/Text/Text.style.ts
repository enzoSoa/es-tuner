import {css} from "@emotion/react";
import {colors} from "../vars";

export const textStyle = (color?: string) => css`
  color: ${color || colors.primary};
  text-transform: uppercase;
  font-family: "Roboto Flex", sans-serif;
  transition: font-weight 0.2s;
  margin: 0;
  
  &:is(h1) {
    font-size: 2rem;
    letter-spacing: 1rem;
    font-weight: 800;
  }
  &:is(h2) {
    font-size: 1.5rem;
    letter-spacing: 0.4rem;
    font-weight: 700;
  }
  &:is(h3) {
    font-size: 1rem;
    letter-spacing: 0.2rem;
    font-weight: 500;
  }
  &:is(p) {
    font-size: 1rem;
    letter-spacing: 0.1rem;
    font-weight: 200;
  }
`;

export const nonSelectable = css`
  user-select: none;
`;