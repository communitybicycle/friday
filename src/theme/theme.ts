import { ITheme, theme } from "@chakra-ui/core";

const customTheme: ITheme = {
  ...theme,
  fonts: {
    body: "Open Sans, sans-serif",
    heading: "Open Sans, sans-serif",
    mono: "monospace",
  },
  colors: {
    ...theme.colors,
    ghostGray: {
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
