import { Action } from "./action";
import { Instruction } from "./instructions";
import { ModulesType } from "./modules";
import { Dashboards, NoteOrFolderMenuItem, Notes } from "./page";

export interface DataState {
  actions: Record<string, Action>;
  modules: {
    [index: string]: ModulesType;
  };
  instructions: Record<string, Instruction>;
  dashboards: Dashboards;
  notes: Notes;
  noteMenu: NoteOrFolderMenuItem[];
}

export type Plugins = "calendar" | "terminal";
