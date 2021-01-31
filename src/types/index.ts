import { Actions } from "./action";
import { Instruction } from "./instructions";
import { ModulesType } from "./modules";
import { Pages } from "./page";

export interface DataState {
  actions: Actions;
  modules: {
    [index: string]: ModulesType;
  };
  instructions: {
    [index: string]: Instruction;
  };
  pages: Pages;
}
