// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      BLUE: string,
      YELLOW: string,
      WHITE?: string,
      GRAY: {
        500?: string,
        700?: string,
        900?: string,
      },
      GRAY_TRANSLUCID: string,
      GREEN: {
        500?: string,
        900?: string,
      },
      RED: {
        500?: string,
        900?: string,
      }
    };
    spacing: {
      small: string,
      medium: string,
      large: string,
    };
    fonts: {
      small: string,
      medium: string,
      large: string,
      extraLarge: string
    },
    pageBackgroundColor?: string,
    cardBg?: string,
    text?: string,
    h1?: string,
    iconColor?: string,
    modalBg?: string,
    accent?: string,
    primary?: string,
    secondary?: string,
    accent?: string
  }
}
