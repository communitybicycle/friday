import { Action } from "./action";
import { Instruction } from "./instructions";
import { ModulesType } from "./modules";
import { Pages } from "./page";

export interface DataState {
  actions: Record<string, Action>;
  modules: {
    [index: string]: ModulesType;
  };
  instructions: Record<string, Instruction>;
  pages: Pages;
}

export type Plugins = "calendar" | "terminal";
