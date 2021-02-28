import { Action } from "./action";
import { Instruction } from "./instructions";
import { ModulesType } from "./modules";
import { Dashboards, Notes } from "./page";

export interface DataState {
  actions: Record<string, Action>;
  modules: {
    [index: string]: ModulesType;
  };
  instructions: Record<string, Instruction>;
  dashboards: Dashboards;
  notes: Notes;
}

export type Plugins = "calendar" | "terminal";
