type PageType = "dashboard" | "notes";

export interface Pages {
  dashboards: Dashboard[];
  notes: Notes[];
}

export interface Page {
  id: string;
  title: string;
  header: string;
  type: PageType;
}

export type Columns = string[][];

export interface Dashboard extends Page {
  columns: Columns;
  type: "dashboard";
}

export interface Notes extends Page {
  notes: any;
  type: "notes";
}
