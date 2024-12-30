import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataSource, Table, TableColumn} from "../../shared/interfaces/table";
import {TableService} from "../../shared/services/table.service";
import {BehaviorSubject, catchError, map, of, startWith, switchMap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  standalone: false
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  tableElements: Table;
  dataSource: DataSource[];
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() set tableData(table: Table) {
    this.tableElements = table
    this.displayedColumns = this.displayedColumns.concat(table.columns.map((x: TableColumn) => x.keyName))
  }

  constructor(private apiService: TableService) {
  }

  ngOnInit(): void {

  }

  public getNestedValue(obj: DataSource, column: TableColumn, path: string): DataSource | string {
    const keys: (keyof DataSource)[] = path.split('.')
    let data;
    if (obj[keys[0]] != null) {
      data = keys.reduce((acc, key) => acc[key], obj);
    }
    return data != null ? data : '-'
  }

  private getData(): void {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.apiService.getData(this.tableElements.url, this.paginator.pageIndex + 1, this.paginator.pageSize)
            .pipe(catchError(() => of(null)));
        }),
        map((empData: DataSource[]) => {
          if (empData == null) return [];
          this.resultsLength = empData.length;
          return empData;
        })
      )
      .subscribe((empData: DataSource[]) => {
        this.dataSource = empData
      });
  }

  ngAfterViewInit(): void {
    this.getData()
  }

}
