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
