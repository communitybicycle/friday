import { ITheme, theme } from "@chakra-ui/core";

const customTheme: ITheme = {
  ...theme,
  fonts: {
    body: "Open Sans, sans-serif",
    heading: "Open Sans, sans-serif",
    mono: "monospace",
  },
};

export default customTheme;
