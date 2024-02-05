import {Component, Input, OnInit} from '@angular/core';
import {Table} from "../../shared/interfaces/table";
import {TableService} from "../../shared/services/table.service";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  tableElements: Table;
  dataSource: any;
  columns: any[] = []

  @Input() set tableData(table: Table) {
    this.tableElements = table
    this.displayedColumns = this.displayedColumns.concat(table.columns.map((x: any) => x.keyName))
    this.tableElements.limit = this.tableElements.limit == null ? 1 : this.tableElements.limit
    this.tableElements.offset = this.tableElements.offset == null ? 10 : this.tableElements.offset
  }

  constructor(private apiService: TableService) {
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
    this.apiService.getData(this.tableElements.url, this.tableElements.offset, this.tableElements.limit).subscribe({
      next: (response: any) => {
        this.dataSource = response
      },
      error: error => {

      },
      complete: () => {
      }
    });
  }

}
