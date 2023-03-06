import { DefaultTheme } from 'styled-components';

import colors from './colors';
import spacing from './spacing';
import fonts from './fonts';

const commomStyles: DefaultTheme = {
  colors: { ...colors },
  spacing: { ...spacing },
  fonts: { ...fonts },
};

export default commomStyles;
