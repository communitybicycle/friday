import { DataState } from "../types";

export const initialData: DataState = {
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
      url: "https://course.fast.ai/",
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
    "6": {
      id: "6",
      type: "app",
      name: "Anytime Fitness Booking",
      description: "Opens the Anytime Fitness booking page.",
      path: "C:\\Users\\Hal\\Desktop\\Scripts\\anytime.py",
    },
    "7": {
      id: "7",
      type: "cmd",
      name: "Run Terracotta",
      description:
        "Runs a Docker instance of Granular's terracotta on port 3000.",
      command: "docker-compose up",
      target: "C:\\Users\\Hal\\Desktop\\Work\\granular.ai\\terracotta",
      detached: true,
    },
    "8": {
      id: "8",
      type: "cmd",
      name: "Run Titan API",
      description:
        "Runs a Docker instance of Granular's Titan API on port 5000.",
      command: "docker-compose up",
      target: "C:\\Users\\Hal\\Desktop\\Work\\granular.ai\\titan-api",
      detached: true,
    },
    "9": {
      id: "9",
      type: "folder",
      name: "Open Titan UI Folder",
      description: "Opens a folder at the Granular Titan UI location.",
      path: "C:\\Users\\Hal\\Desktop\\Work\\granular.ai\\titan-ui",
    },
    "11b8077f-14d3-4f5f-891b-6d05f7756e1d": {
      id: "11b8077f-14d3-4f5f-891b-6d05f7756e1d",
      name: "Open Titan UI in Webstorm",
      description: "Begin your work on Titan UI.",
      type: "cmd",
      command: "webstorm .",
      target: "C:\\Users\\Hal\\Desktop\\Work\\granular.ai\\titan-ui",
      detached: false,
    },
    "ed2a08e1-2693-4a0f-bd52-ce9159476b50": {
      id: "ed2a08e1-2693-4a0f-bd52-ce9159476b50",
      name: "Open Titan API in VS Code",
      description: "Begin your work on Titan API.",
      type: "cmd",
      command: "code .",
      target: "C:\\Users\\Hal\\Desktop\\Work\\granular.ai\\titan-api",
      detached: false,
    },
    "564c2d03-1ce3-4e3c-9e66-41b5606f264c": {
      id: "564c2d03-1ce3-4e3c-9e66-41b5606f264c",
      name: "Granular Scrum Meetings",
      description: "Opens the Granular daily scrum meetings Notion page.",
      type: "link",
      url:
        "https://www.notion.so/granular/Scrum-Meetings-b2939023df594e53abfb03ade10229ff",
    },
    "39e97043-358d-467c-9048-280dfa4c6b5b": {
      id: "39e97043-358d-467c-9048-280dfa4c6b5b",
      name: "Open Granular.ai in Webstorm",
      description: "Begin work on Granular's Gatsby site.",
      type: "cmd",
      command: "webstorm .",
      target: "C:\\Users\\Hal\\Desktop\\Work\\granular.ai\\granular.ai",
      detached: false,
    },
    "57ba0fcc-461b-4251-95a4-b10db548d400": {
      id: "57ba0fcc-461b-4251-95a4-b10db548d400",
      name: "Campbell River Rentals",
      description: "Shows all latest rental units on Craigslist for CR.",
      type: "link",
      url:
        "https://comoxvalley.craigslist.org/d/apartments-housing-for-rent/search/apa?sort=date&availabilityMode=0&query=campbell%20river",
    },
    "cf4f4e87-0817-46d0-b125-ff8a1c06ae78": {
      id: "cf4f4e87-0817-46d0-b125-ff8a1c06ae78",
      name: "Open MongoDBCompass",
      description: "Open the mongoDB Compass application.",
      type: "link",
      url: "C:\\Program Files\\MongoDB Compass\\MongoDBCompass.exe",
    },
  },
  instructions: {
    "1": {
      id: "1",
      name: "Learn ML",
      description: "Fast AI course to learn ML quickly!",
      instructions: ["4", "5"],
    },
    "bb2076b4-5671-45ed-80c1-45475e3ef7a3": {
      id: "bb2076b4-5671-45ed-80c1-45475e3ef7a3",
      name: "Begin Titan Work",
      description: "Initializes the full stack Titan workspace.",
      instructions: [
        "7",
        "8",
        "11b8077f-14d3-4f5f-891b-6d05f7756e1d",
        "ed2a08e1-2693-4a0f-bd52-ce9159476b50",
        "cf4f4e87-0817-46d0-b125-ff8a1c06ae78",
      ],
    },
    "6c5064ee-6f3d-4270-ad88-d398c5896961": {
      id: "6c5064ee-6f3d-4270-ad88-d398c5896961",
      name: "Open Granular Sites",
      description: "Opens the bundle of Granular-related sites.",
      instructions: ["2", "3", "1"],
    },
  },
  modules: {
    "123": {
      id: "123",
      dashboardId: "abc",
      type: "automations",
      header: "Helper",
      automations: [
        {
          type: "instruction",
          automationId: "bb2076b4-5671-45ed-80c1-45475e3ef7a3",
        },
        {
          type: "instruction",
          automationId: "6c5064ee-6f3d-4270-ad88-d398c5896961",
        },
      ],
    },
    "234": {
      id: "234",
      dashboardId: "abc",
      type: "text",
      header: "Quick Start",
      text:
        "Welcome to Friday. Here you can automate your tedious tasks, keep notes, see the weather, and more!",
    },
    "265f0e7d-c95e-427b-8efb-fc518034ee0a": {
      id: "265f0e7d-c95e-427b-8efb-fc518034ee0a",
      dashboardId: "abc",
      type: "notes",
      header: "New notes module",
      text: "You can write stuff in here easily.",
    },
    "979d845d-9d41-44c9-96ef-3b7bc83d30ca": {
      id: "979d845d-9d41-44c9-96ef-3b7bc83d30ca",
      dashboardId: "abc",
      type: "automations",
      header: "Automations",
      automations: [],
      hideHeader: false,
    },
  },
  dashboards: {
    abc: {
      id: "abc",
      title: "Personal Dashboard",
      header: "Welcome, Hal!",
      type: "dashboards",
      columns: [
        ["123"],
        [
          "979d845d-9d41-44c9-96ef-3b7bc83d30ca",
          "234",
          "265f0e7d-c95e-427b-8efb-fc518034ee0a",
        ],
      ],
    },
  },
  notes: {
    bce: {
      id: "bce",
      title: "General Notes",
      content: "Notes placeholder here",
      tags: [],
      createdAt: "2021-02-28T00:50:17-08:00",
      updatedAt: "2021-02-28T00:50:17-08:00",
    },
    bcf: {
      id: "bcf",
      title: "General Notes 2",
      content: "Notes placeholder here 2",
      tags: [],
      createdAt: "2021-02-28T00:50:17-08:00",
      updatedAt: "2021-02-28T00:50:17-08:00",
    },
    "f128f597-b9a4-40e0-a854-9b3fa30ed366": {
      id: "f128f597-b9a4-40e0-a854-9b3fa30ed366",
      content: "<p>asdfasdfasdfasdf</p>",
      title: "New Note Y'all",
      tags: [],
      createdAt: "2021-02-28T00:50:17-08:00",
      updatedAt: "2021-02-28T00:50:17-08:00",
    },
  },
  noteMenu: [
    { type: "note", id: "bce" },
    {
      type: "folder",
      id: "folderaaa",
      subItems: [{ type: "note", id: "bcf" }],
      title: "July 1st",
    },
    { id: "f128f597-b9a4-40e0-a854-9b3fa30ed366", type: "note" },
  ],
};
