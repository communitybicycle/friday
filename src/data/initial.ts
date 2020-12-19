import { Actions } from "../types";

interface InitialData {
  actions: Actions;
  modules: {
    [index: string]: any;
  };
  pages: {
    dashboard: {
      header: string;
      columns: string[][];
    };
  };
}

export const initialData: InitialData = {
  actions: {},
  modules: {
    "999": {
      type: "notes",
      header: "Notes",
      text: "Your notes can go here!",
    },
    "123": {
      type: "automations",
      header: "Automations",
      automations: [
        {
          name: "Study ML",
          instructions: [
            {
              type: "link",
              link: "https://course.fast.ai/",
            },
            {
              type: "terminal",
              command: "jupyter notebook",
              target: "C:\\Users\\Hal\\Desktop\\fastbook",
              detached: true,
            },
          ],
        },
        {
          name: "Start Work",
          instructions: [
            {
              type: "terminal",
              command: "webstorm64.exe ./",
              target: "C:\\Users\\Hal\\work\\ERBP-Frontend",
              detached: false,
            },
            {
              type: "link",
              link: "http://localhost:8000/api/docs",
            },
            {
              type: "link",
              link: "https://app.asana.com/",
            },
          ],
        },
        {
          name: "Pull Backend",
          instructions: [
            {
              type: "terminal",
              command: "git pull",
              target: "C:\\Users\\Hal\\work\\ERBP-Backend",
              detached: true,
            },
          ],
        },
      ],
    },
    "234": {
      type: "text",
      header: "Quick Start",
      text:
        "Welcome to Friday. Here you can automate your tedious tasks, keep notes, see the weather, and more!",
    },
  },
  pages: {
    dashboard: {
      header: "Welcome, Hal!",
      columns: [["234", "123"], ["999"]],
    },
  },
};
