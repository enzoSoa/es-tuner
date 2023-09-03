import {Icon, Icons, Text, TextType} from "../../ui";
import {logoStyle} from "./style";
import {useEffect, useState} from "react";

export const HeaderLogo = () => {
  const windowMediaQuery = window.matchMedia('(max-width: 768px)');
  const [isPhoneFormat, setIsPhoneFormat] = useState(windowMediaQuery.matches);

  useEffect(() => {
    const watchWindowFormat = () => setIsPhoneFormat(windowMediaQuery.matches);
    window.addEventListener('resize', () => watchWindowFormat());

    return () => window.removeEventListener('resize', () => watchWindowFormat());
  }, [])

  return <div css={logoStyle}>
    <Icon icon={Icons.Logo}/>
    {!isPhoneFormat && <Text type={TextType.H1}>estuner</Text>}
  </div>;
}