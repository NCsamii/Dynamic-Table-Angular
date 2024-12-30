import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Table} from "../../shared/interfaces/table";
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
  dataSource: any;
  columns: any[] = []
  resultsLength = 0;
  params = new BehaviorSubject({})
  params$ = this.params.asObservable()
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() set tableData(table: Table) {
    this.tableElements = table
    this.displayedColumns = this.displayedColumns.concat(table.columns.map((x: any) => x.keyName))
  }

  constructor(private apiService: TableService) {
  }

  ngOnInit(): void {

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
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.apiService.getData(this.tableElements.url, this.paginator.pageIndex + 1, this.paginator.pageSize)
            .pipe(catchError(() => of(null)));
        }),
        map((empData) => {
          if (empData == null) return [];
          this.resultsLength = empData.length;
          return empData;
        })
      )
      .subscribe((empData) => {
        this.dataSource = empData
      });
    // this.params$.pipe(switchMap(() => {
    //   return this.apiService.getData(this.tableElements.url, this.tableElements.offset, this.tableElements.limit)
    // })).subscribe((response: any) => {
    //   this.resultsLength = response.length;
    //   this.dataSource = response
    // })

  }

  ngAfterViewInit(): void {
    this.getData()
  }

}
