export interface Table {
  columns: TableColumn[];
  row: TableRow[];
  url: string;
}

export interface TableRow {
  [key: string]: any
}
export  interface TableColumn{
  keyName: string
  label: string
}
