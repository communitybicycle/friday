import { FolderMenuItem, NoteOrFolderMenuItem } from "types/page";
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

export const noteSearch = (
  source: NoteOrFolderMenuItem[],
  target: string
): string[] => {
  let output: string[] = [];

  const loop = (src: NoteOrFolderMenuItem[], arr: string[]) => {
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

export const toIndex = (
  src: NoteOrFolderMenuItem[],
  target: string
): number => {
  return src.findIndex((item) => item.id === target);
};

export const reorderNotes = (
  source: NoteOrFolderMenuItem[],
  sourceId: string, // draggable id
  destinationId: string, // column id
  sourceIndex: number,
  destinationIndex: number
): NoteOrFolderMenuItem[] => {
  const menu = Array.from(source);
  const sourceRoute = noteSearch(menu, sourceId);
  const destinationRoute = noteSearch(menu, destinationId);
  destinationRoute.pop();
  console.log("menu:", menu);

  console.log("Source route:", sourceRoute);
  console.log("Destination route:", destinationRoute);

  // remove source item
  let current: NoteOrFolderMenuItem[] = menu;
  let removed: NoteOrFolderMenuItem;
  for (let i = 0; i <= sourceRoute.length; i++) {
    console.log("Current:", current);
    if (i === sourceRoute.length) {
      console.log("HERE");
      // last loop
      removed = current.splice(sourceIndex, 1)[0];
      break;
    } else if (i < sourceRoute.length) {
      // get index of the current item
      const index = toIndex(current, sourceRoute[i]);
      console.log("Index:", index);
      const folder = current[index] as FolderMenuItem;
      console.log("Folder:", folder);
      current = folder.subItems;
    }
  }

  console.log("Removed:", removed);

  // add to destination
  current = menu;
  for (let i = 0; i <= destinationRoute.length; i++) {
    if (i === destinationRoute.length) {
      console.log("Last loop");
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

  console.log("New Menu:", menu);

  return menu;
};
