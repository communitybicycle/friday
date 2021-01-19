import { Instruction } from "../types/instructions";
import { ModulesType } from "../types/modules";
import { Actions } from "../types/action";
import { Pages } from "../types/page";

interface InitialData {
  actions: Actions;
  modules: {
    [index: string]: ModulesType;
  };
  instructions: {
    [index: string]: Instruction;
  };
  pages: Pages;
}

export const initialData: InitialData = {
  actions: {
    "1": {
      id: "1",
      type: "link",
      name: "Granular Jira Board",
      description:
        "Opens a webpage of the Granular Jira task management board.",
      url: "https://granularai.atlassian.net/secure/BrowseProjects.jspa",
    },
    "2": {
      id: "2",
      type: "link",
      name: "Granular Whimsical",
      description: "Opens the Granular Whimsical site",
      url: "https://whimsical.com/main-MSUhkuqUk3qNCdTZiht5PZ",
    },
    "3": {
      id: "3",
      type: "link",
      name: "Granular Notion",
      description: "Opens the Granular Notion page",
      url:
        "https://www.notion.so/Granular-Homepage-ee084ff864724f838bdd1d3cc74207ae",
    },
    "4": {
      id: "4",
      type: "link",
      name: "Fast AI",
      description: "Course page for learning ML.",
      url: "",
    },
    "5": {
      id: "5",
      type: "cmd",
      name: "Open ML Jupyter Notebook",
      description:
        "Opens a Jupyter Notebook at the course workload book location.",
      command: "jupyter notebook",
      target: "C:\\Users\\Hal\\Desktop\\fastbook",
      detached: true,
    },
  },
  instructions: {
    "1": {
      id: "1",
      name: "Learn ML",
      description: "Fast AI course to learn ML quickly!",
      instructions: ["4", "5"],
    },
  },
  modules: {
    "999": {
      id: "999",
      type: "notes",
      header: "Notes",
      text: "Your notes can go here!",
    },
    "123": {
      id: "123",
      type: "automations",
      header: "Helper",
      automations: [
        {
          type: "instruction",
          automationId: "1",
        },
      ],
    },
    "234": {
      id: "234",
      type: "text",
      header: "Quick Start",
      text:
        "Welcome to Friday. Here you can automate your tedious tasks, keep notes, see the weather, and more!",
    },
  },
  pages: {
    dashboards: [
      {
        id: "abc",
        title: "Personal Dashboard",
        header: "Welcome, Hal!",
        type: "dashboard",

        columns: [["234", "123"], ["999"]],
      },
    ],
    notes: [
      {
        id: "bce",
        title: "General Notes",
        header: "Notes Page Here",
        type: "notes",
        notes: "Notes placeholder here",
      },
    ],
  },
};
