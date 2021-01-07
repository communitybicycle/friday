export type ActionType = "link" | "folder" | "app" | "cmd";

export interface Action {
  id: string;
  name?: string;
  description?: string;
  type: ActionType;
  path?: string;
  address?: string;
}

export interface Actions {
  [key: string]: Action;
}
