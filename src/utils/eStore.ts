import Store from "electron-store";

export const eStore = new Store();

console.log("eStore init color mode:", eStore.get("colorMode"));
