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
