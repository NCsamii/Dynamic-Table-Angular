import {Component, Input, OnInit} from '@angular/core';
import {Table} from "../../shared/interfaces/table";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  @Input() set tableData(table: Table) {
    this.displayedColumns = this.displayedColumns.concat(table.columns.map((x: any) => x.keyName))
    this.tableElements = table
  }


  displayedColumns: string[] = [];
  tableElements: Table;
  dataSource: any;
  columns: any[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.getData()
  }

  getNestedValue(obj: any, column: any, path: string): any {
    const keys = path.split('.')
    let data;
    if (obj[keys[0]] !== null) {
      data = keys.reduce((acc, key) => acc[key], obj);
    }
    return data != null ? data : '-'
  }

  getData() {

  }

}
