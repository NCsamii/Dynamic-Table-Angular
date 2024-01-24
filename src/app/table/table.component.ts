import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  @Input() set tableData(table: any) {
    this.displayedColumns = this.displayedColumns.concat(table.columns.map((x: any) => x.keyName))
    this.tableElements = table
  }


  displayedColumns: string[] = [];
  tableElements: any;
  dataSource: any;
  columns: any[] = []

  constructor() {
  }

  getNestedValue(obj: any, column: any, path: string): any {
    const keys = path.split('.')
    let data;
    if (obj[keys[0]] !== null) {
      data = keys.reduce((acc, key) => acc[key], obj);
    }
    return data != null ? data : '-'
  }
}
