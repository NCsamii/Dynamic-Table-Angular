export interface Table {
  columns: TableColumn[];
  row: TableRow[];
  url: string;
  limit?: number;
  offset?: number
}

export interface TableRow {
  [key: string]: any
}

export interface TableColumn {
  keyName: string
  label: string
}
