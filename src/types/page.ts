export type PageType = "dashboards" | "notes";

export interface Pages {
  dashboards: Dashboards;
  notes: Notes;
}

export interface Page {
  id: string;
  title: string;
  header?: string;
  featureImage?: string;
  type: PageType;
}

export type Columns = string[][];

export type Dashboards = Record<string, Dashboard>;
export type Notes = Record<string, Note>;

export interface Dashboard extends Page {
  columns: Columns;
  type: "dashboards";
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface MenuItem {
  id: string;
}

export interface NoteMenuItem extends MenuItem {
  type: "note";
}

export interface FolderMenuItem extends MenuItem {
  type: "folder";
  title: string;
  subItems: NoteOrFolderMenuItem[];
}

export type NoteOrFolderMenuItem = NoteMenuItem | FolderMenuItem;
