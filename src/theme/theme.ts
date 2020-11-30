import { ITheme, theme } from "@chakra-ui/core";

const customTheme: ITheme = {
  ...theme,
  fonts: {
    body: "Open Sans",
    heading: "Open Sans, sans-serif",
    mono: "monospace",
  },
};

export default customTheme;
