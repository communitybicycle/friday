export type ActionType = "link" | "folder" | "app" | "cmd";

export interface Action {
  id: string;
  name: string;
  description?: string;
  type: ActionType;
  command?: string;
  target?: string;
  detached?: boolean;
  path?: string;
  url?: string;
}

export interface Actions {
  [key: string]: Action;
}
