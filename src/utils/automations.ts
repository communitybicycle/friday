import { shell } from "electron";
import { exec } from "child_process";
import { Action, Actions } from "../types/action";
import { Instruction } from "../types/instructions";

export const openLink = (url: string) => {
  shell.openExternal(url);
};

export const openFolder = (path: string) => {
  shell.openExternal("file://" + path);
};

export const openApp = (path: string) => {
  console.log("HERE!", path);
  try {
    exec(`start cmd /k "${path}"`, { detached: true } as any, (err: any) => {
      console.log("Open App error:", err);
    });
  } catch (e) {
    console.log("Open App error:", e);
  }
};

export const openTerminal = (
  command: string,
  target: string,
  detached = true
) => {
  console.log("Opening terminal...", target);
  console.log("Command:", command);
  console.log("Target:", target);

  console.log("PATH:", process.env.PATH);

  const options = {
    detached,
  } as any;

  if (target !== "default") {
    options.cwd = target;
  }

  const terminal = exec(`start cmd /k ${command}`, options, (err: any) => {
    console.log("Error:", err);
  });

  console.log("Terminal: ", terminal);

  terminal.stdout?.on("data", (data) => {
    console.log("Stdout data:", data);
  });

  terminal.on("error", (err) => {
    console.error("Failed to start terminal:", err);
  });

  terminal.on("close", () => {
    console.log("Terminal closed.");
  });
};

export const automate = (instructions: any) => {
  instructions.forEach((instruction: any) => {
    switch (instruction.type) {
      case "link":
        openLink(instruction.link);
        return;
      case "terminal":
        openTerminal(instruction.command, instruction.target);
        return;
      default:
        return;
    }
  });
};

export const runAction = (action: Action): void => {
  switch (action.type) {
    case "link":
      if (action.url) {
        openLink(action.url);
      }
      break;
    case "folder":
      if (action.path) {
        openFolder(action.path);
      }
      break;
    case "app":
      if (action.path) {
        openApp(action.path);
      }
      break;
    case "cmd":
      if (action.command) {
        const target = action.target || "default";
        openTerminal(action.command, target, action.detached);
      }
      break;
    default:
      break;
  }
};

export const runInstruction = (
  instruction: Instruction,
  actions: Actions
): void => {
  instruction.instructions.forEach((actionId) => runAction(actions[actionId]));
};
