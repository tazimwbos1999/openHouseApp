import type { ThemeConfiguration } from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  DARK = 'dark',
}

const colorsLight = {
  commonWhite: "#FFFFFF",
  commonBlack: "#000000",
  commonRed: "#FF0000",
  primaryLighter: "#FEE9D1",
  primaryMain: "#FA541C",
  primaryLight: "#FDAB76",
  secondaryLighter: "#EFD6FF",
  secondaryMain: "#8E33FF",
  secondaryLight: "#C684FF",
  infoLighter: "#CAFDF5",
  infoMain: "#00B8D9",
  infoLight: "#61F3F3",
  successLighter: "#D3FCD2",
  successMain: "#22C55E",
  successLight: "#77ED8B",
  warningLighter: "#FFF5CC",
  warningMain: "#FFAB00",
  warningLight: "#FFD666",
  errorLighter: "#FFE9D5",
  errorMain: "#FF5630",
  errorLight: "#FFAC82",
  gray50: "#FCFDFD",
  gray100: "#F9FAFB",
  gray200: "#F4F6F8",
  gray300: "#DFE3E8",
  gray400: "#919EAB",
  gray500: "#919EAB",
  gray600: "#637381",
  gray700: "#454F5B",
  gray800: "#1C252E",
  purple100: '#E1E1EF',
  purple50: '#1B1A23',
  purple500: '#44427D',
  red500: '#C13333',
  skeleton: '#A1A1A1',
} as const;

const colorsDark = {
  commonWhite: "#FFFFFF",
  commonBlack: "#000000",
  commonRed: "#FF0000",
  primarydark: "#B3200E",
  primarydarker: "#770508",
  secondarydark: "#5119B7",
  secondarydarker: "#27097A",
  infodark: "#006C9C",
  infodarker: "#003768",
  successdark: "#118D57",
  successdarker: "#065E49",
  warningdark: "#B76E00",
  warningdarker: "#7A4100",
  errordark: "#B71D18",
  errorDarker: "#7A0916",
  gray50: '#FCFDFD',
  gray100: '#000000',
  gray200: '#BABABA',
  gray400: '#969696',
  gray500: '#EFEFEF',
  gray800: '#E0E0E0',
  purple100: '#252732',
  purple50: '#1B1A23',
  purple500: '#A6A4F0',
  red500: '#C13333',
  skeleton: '#303030',
} as const;

const sizes = [4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80] as const;

export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 8, 16],
    widths: [1, 2],
  },
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.gray100,
    card: colorsLight.gray50,
  },
  variants: {
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.purple50,
        card: colorsDark.purple50,
      },
    },
  },
} as const satisfies ThemeConfiguration;
