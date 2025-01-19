import type { TextStyle } from 'react-native';
import type { UnionConfiguration } from '@/theme/types/config';
import { Typography } from '@/theme/assets/typography/typograpgy'
import type { FontColors, FontSizes } from '@/theme/types/fonts';

import { config } from '@/theme/_config';

export const generateFontColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.fonts.colors ?? {}).reduce(
    (acc, [key, value]) => {
      return Object.assign(acc, {
        [`${key}`]: {
          color: value,
        },
      });
    },
    {} as FontColors,
  );
};

export const generateFontSizes = () => {
  return config.fonts.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
      [`size_${size}`]: {
        fontSize: size,
      },
    });
  }, {} as FontSizes);
};

export const staticFontStyles = {
  alignCenter: {
    textAlign: 'center',
  },
  // bold: {
  //   fontWeight: 'bold',
  // },
  capitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  thin: {
    fontFamily: Typography.thin,
  },
  normal: {
    fontFamily: Typography.normal,
  },
  bold: {
    fontFamily: Typography.bold,
  },
  medium: {
    fontFamily: Typography.medium,
  },
  semiBold: {
    fontFamily: Typography.semiBold,
  },
  interSemiBold: {
    fontFamily: Typography.interSemiBold,
  },
  extraBold: {
    fontFamily: Typography.extraBold,
  },
  maxBold: {
    fontFamily: Typography.maxBold,
  },
  boldItalic: {
    fontFamily: Typography.boldItalic,
  },
} as const satisfies Record<string, TextStyle>;
