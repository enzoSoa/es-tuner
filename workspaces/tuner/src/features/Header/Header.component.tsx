import {HeaderLogo} from "./Header.logo";
import {headerStyle} from "./Header.style";

export function HeaderComponent() {
  return <header css={headerStyle}>
    <HeaderLogo/>
  </header>;
}