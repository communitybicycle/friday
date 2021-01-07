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
