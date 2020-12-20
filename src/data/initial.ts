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
  actions: {
    "111": {
      id: "111",
      type: "link",
      name: "Granular Jira Board",
      description:
        "Opens a webpage of the Granular Jira task management board.",
      path: "https://granularai.atlassian.net/secure/BrowseProjects.jspa",
    },
    "222": {
      id: "222",
      type: "link",
      name: "Granular Whimsical",
      description: "Opens the Granular Whimsical site",
      path: "https://whimsical.com/main-MSUhkuqUk3qNCdTZiht5PZ",
    },
    "333": {
      id: "333",
      type: "link",
      name: "Granular Notion",
      description: "Opens the Granular Notion page",
      path:
        "https://www.notion.so/Granular-Homepage-ee084ff864724f838bdd1d3cc74207ae",
    },
  },
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
