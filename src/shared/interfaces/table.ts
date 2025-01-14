export interface Table {
  columns: TableColumn[];
  url: string;
  limit?: number;
  offset?: number
}

export interface TableColumn {
  keyName: string
  label: string
}

export interface DataSource {
  [key: string]: any;
}
