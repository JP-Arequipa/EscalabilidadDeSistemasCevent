import {
  TypographyVariantsOptions,
  Palette,
  PaletteOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    displayLarge: React.CSSProperties;
    display: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    body: React.CSSProperties;
    tiny: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    displayLarge?: React.CSSProperties;
    display?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    body?: React.CSSProperties;
    tiny?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    displayLarge: true;
    display: true;
    bodyLarge: true;
    body: true;
    tiny: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    lightBlack: Palette['primary'];
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    lightBlack?: PaletteOptions['primary'];
    accent?: PaletteOptions['primary'];
  }
}
