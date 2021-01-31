import { ITheme, theme } from "@chakra-ui/core";
import { ColorHues } from "@chakra-ui/core/dist/theme";

interface CustomTheme extends ITheme {
  colors: {
    transparent: string;
    current: string;
    black: string;
    white: string;
    whiteAlpha: ColorHues;
    blackAlpha: ColorHues;
    gray: ColorHues;
    red: ColorHues;
    orange: ColorHues;
    yellow: ColorHues;
    green: ColorHues;
    teal: ColorHues;
    blue: ColorHues;
    cyan: ColorHues;
    purple: ColorHues;
    pink: ColorHues;
    linkedin: ColorHues;
    facebook: ColorHues;
    messenger: ColorHues;
    whatsapp: ColorHues;
    twitter: ColorHues;
    telegram: ColorHues;
    ghostGray: ColorHues;
    veryWhite: ColorHues;
  };
}

const customTheme: CustomTheme = {
  ...theme,
  fonts: {
    body: "Open Sans, sans-serif",
    heading: "Open Sans, sans-serif",
    mono: "monospace",
  },
  colors: {
    ...theme.colors,
    veryWhite: {
      50: "#ffffff",
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#ffffff",
      600: "#ffffff",
      700: "#ffffff",
      800: "#ffffff",
      900: "#ffffff",
    },
    ghostGray: {
      50: "#718096",
      100: "#718096",
      200: "#718096",
      300: "#718096",
      400: "#718096",
      500: "#718096",
      600: "#718096",
      700: "#718096",
      800: "#718096",
      900: "#718096",
    },
  },
};

export default customTheme;
