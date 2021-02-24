import {
  ModulesType,
  ModuleTypes,
  NotesModule,
  TextModule,
} from "types/modules";
import { uuid } from "utils/index";

export const createModule = (
  type: ModuleTypes,
  dashboardId: string
): ModulesType | undefined => {
  switch (type) {
    case "text":
      return {
        id: uuid(),
        dashboardId,
        type: "text",
        header: "New text module",
        text: "You can replace me!",
      } as TextModule;
    case "notes":
      return {
        id: uuid(),
        dashboardId,
        type: "notes",
        header: "New notes module",
        text: "You can write stuff in here easily.",
      } as NotesModule;
    default:
      break;
  }
};
