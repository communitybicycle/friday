import _ from "lodash";
import { FolderMenuItem, NoteMenu, NoteOrFolderMenuItem } from "types/page";
import { v4 } from "uuid";

export const capitalize = (str: string): string => {
  return str
    .split(" ")
    .map((word) => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return "";
    })
    .join(" ");
};

export const uuid = (): string => {
  return v4();
};

// const getDraggedFile = (event) => event.dataTransfer.items[0];
// const getDroppedFile = (event) => event.dataTransfer.files[0];
// const fileTypeIsSupported = (file) => {
//   return ["text/plain", "text/markdown"].includes(file.type);
// };

export const addDataTypeField = (arr: any[], value: string): any[] => {
  return arr.map((item) => ({ ...item, dataType: value }));
};

export const deleteStringInNestedArray = (
  arr: string[][],
  value: string
): string[][] => {
  const output: string[][] = [];

  arr.forEach((col) => {
    const newCol: string[] = [];

    col.forEach((item) => {
      if (item !== value) {
        newCol.push(item);
      }
    });

    output.push(newCol);
  });

  return output;
};

export const noteSearch = (source: NoteMenu, target: string): string[] => {
  let output: string[] = [];

  const loop = (src: NoteMenu, arr: string[]) => {
    src.forEach((item) => {
      const newArray = Array.from(arr);

      newArray.push(item.id);

      if (item.id === target) {
        output = newArray;
      } else {
        if (
          item.type === "folder" &&
          item.subItems &&
          item.subItems.length > 0
        ) {
          loop(item.subItems, newArray);
        }
      }
    });
  };

  loop(source, []);

  return output;
};

export const toIndex = (src: NoteMenu, target: string): number => {
  return src.findIndex((item) => item.id === target);
};

export const reorderNotes = (
  source: NoteMenu,
  sourceId: string, // draggable id
  destinationId: string, // column id
  sourceIndex: number,
  destinationIndex: number
): NoteMenu => {
  const menu = Array.from(source);
  const sourceRoute = noteSearch(menu, sourceId);
  const destinationRoute = noteSearch(menu, destinationId);
  if (destinationRoute[0] === "root") {
    destinationRoute.pop();
  }

  // remove source item
  let current: NoteMenu = menu;
  let removed: NoteOrFolderMenuItem | undefined;
  for (let i = 0; i <= sourceRoute.length; i++) {
    if (i === sourceRoute.length) {
      // last loop
      removed = current.splice(sourceIndex, 1)[0];
      break;
    } else if (i < sourceRoute.length) {
      // get index of the current item
      const index = toIndex(current, sourceRoute[i]);
      const folder = current[index] as FolderMenuItem;
      current = folder.subItems;
    }
  }

  // add to destination
  current = menu;
  for (let i = 0; i <= destinationRoute.length; i++) {
    if (i === destinationRoute.length && removed) {
      // last loop
      current.splice(destinationIndex, 0, removed);
      break;
    } else if (i < destinationRoute.length) {
      // get index of the current item
      const index = toIndex(current, destinationRoute[i]);
      const folder = current[index] as FolderMenuItem;
      current = folder.subItems;
    }
  }

  return menu;
};

export const alterNestedMenuItem = (
  target: string,
  menu: NoteMenu,
  callback: (foundItem: NoteOrFolderMenuItem) => void
): NoteMenu => {
  try {
    const menuCopy = _.cloneDeep(menu);
    const targetRoute = noteSearch(menuCopy, target);
    targetRoute.pop();

    let current: NoteMenu = menuCopy;

    for (let i = 0; i < targetRoute.length; i++) {
      const index = toIndex(current, targetRoute[i]);

      const folder = current[index] as FolderMenuItem;
      current = folder.subItems;
    }

    const index = toIndex(current, target);

    callback(current[index]);

    return menuCopy;
  } catch (e) {
    console.log("alterNestedMenuItem error:", e);
    return menu;
  }
};
