export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({
  xs,
  sm,
  md,
  lg,
}: {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}) {
  return {
    "@media (max-width:600px)": {
      fontSize: pxToRem(xs),
    },
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontWeightSemiBold: React.CSSProperties["fontWeight"];
  }
}

const primaryFont = "Open Sans Variable, sans-serif";

export const typography = {
  fontFamily: primaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 25, sm: 25, md: 35, lg: 40 }),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(35),
    ...responsiveFontSizes({ xs: 20, sm: 20, md: 25, lg: 30 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 20, sm: 20, md: 22, lg: 24 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ xs: 16, sm: 20, md: 16, lg: 20 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 16, lg: 16 }),
  },
  subtitle1: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 14, lg: 16 }),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 20 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(13),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: "unset",
  },
} as const;
