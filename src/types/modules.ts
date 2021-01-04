import { Action } from "./action";

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

interface Automation {
  id: string;
  name: string;
  description?: string;
  instructions: Action[];
}

export interface AutomationModule extends Module {
  type: "automations";
  automations: Automation[];
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

export interface PhotoModule extends Module {
  src: string;
}

export interface CalendarModule extends Module {
  apiKey?: string;
}

export interface WeatherModule extends Module {
  city: string;
  numberOfDays: number;
  apiKey?: string;
}
