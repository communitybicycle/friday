import { Action } from "./index";

type ModuleTypes =
  | "text"
  | "notes"
  | "photo"
  | "calendar"
  | "weather"
  | "automations"
  | "actions";

export interface Module {
  id: string;
  type: ModuleTypes;
  header: string;
  hideHeader?: boolean;
}

export interface Modules {
  [key: string]: Module;
}

export type ModulesType =
  | ActionModule
  | TextModule
  | NotesModule
  | AutomationModule;

export interface AutomationModule extends Module {
  type: "automations";
  automations: any[];
}

export interface ActionModule extends Module {
  type: "actions";
  actions: Action[];
}

export interface TextModule extends Module {
  type: "text";
  text: string;
}

export interface NotesModule extends Module {
  type: "notes";
  text: string;
}
