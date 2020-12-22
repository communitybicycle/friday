export type ActionType = "link" | "folder" | "app" | "run";

export interface Action {
  id: string;
  name?: string;
  description?: string;
  type: ActionType;
  path?: string;
}

export interface Actions {
  [key: string]: Action;
}

export interface Automation {
  name: string;
  instructions: Action[];
}

type PageType = "dashboard" | "notes";

export interface Pages {
  dashboards: Dashboard[];
  notes: Notes[];
}

export interface Page {
  id: string;
  title: string;
  header: string;
  type: PageType;
}
export interface Dashboard extends Page {
  columns: string[][];
  type: "dashboard";
}
export interface Notes extends Page {
  notes: any;
  type: "notes";
}
