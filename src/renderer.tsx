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

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { BrowserRouter } from "react-router-dom";
import customTheme from "./theme/theme";
import { Provider } from "react-redux";
import { store } from "./reducers/store";

const customTitleBar = window.require("custom-electron-titlebar");

new customTitleBar.Titlebar({
  backgroundColor: customTitleBar.Color.fromHex("#333"),
  // menu: null,
  titleHorizontalAlignment: "left",
  unfocusEffect: false,
  closeable: true,
});

// myTitleBar.updateTitle("Friday - Your Personal Assistant");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
