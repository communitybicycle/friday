import { shell } from "electron";
import { exec } from "child_process";

export const openLink = (url: string) => {
  shell.openExternal(url);
};

export const openTerminal = (
  command: string,
  target: string
  // detached = true
) => {
  console.log("Opening terminal...", target);

  const terminal = exec(
    `start cmd /k ${command}`,
    {
      // detached,
      cwd: target,
    },
    (err: any) => {
      console.log("Errrorrrr:", err);
    }
  );

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
