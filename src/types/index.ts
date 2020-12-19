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

export interface Module {
  id: string;
  type: string;
  header?: string;
  text?: string;
}

export interface Modules {
  [key: string]: Module;
}

export interface ActionModule extends Module {
  actions: Action[];
}
