/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import { Color, Titlebar } from "custom-electron-titlebar";
import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import "react-dropzone-uploader/dist/styles.css";
import "react-hot-loader";
import "react-quill/dist/quill.bubble.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "reducers/store";
import customTheme from "theme/theme";
import { eStore } from "utils/eStore";
import App from "./App";
import "./index.css";

dotenv.config();

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const colorMode = eStore.get("colorMode");
const color = colorMode ? (colorMode === "dark" ? "#1A202C" : "#333") : "#333";

const titleBar = new Titlebar({
  backgroundColor: Color.fromHex(color || "#333"),
  // menu: null,
  titleHorizontalAlignment: "left",
  unfocusEffect: false,
  closeable: true,
});

eStore.onDidChange("colorMode", (value) => {
  if (value === "dark") {
    titleBar.updateBackground(Color.fromHex("#1A202C"));
  } else {
    titleBar.updateBackground(Color.fromHex("#333"));
  }
});

// myTitleBar.updateTitle("Friday - Your Personal Assistant");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <CSSReset />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
