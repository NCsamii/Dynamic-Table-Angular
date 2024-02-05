import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Table} from "../../shared/interfaces/table";
import {TableService} from "../../shared/services/table.service";
import {BehaviorSubject, switchMap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit ,AfterViewInit{
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
    this.tableElements.limit = this.tableElements.limit == null ? 1 : this.tableElements.limit
    this.tableElements.offset = this.tableElements.offset == null ? 10 : this.tableElements.offset
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
    console.log(2 , this.paginator.pageIndex)
    this.params$.pipe(switchMap(() => {
      return this.apiService.getData(this.tableElements.url, this.tableElements.offset, this.tableElements.limit)
    })).subscribe((response: any) => {
      this.resultsLength = response.length;
      this.dataSource = response
    })

  }

  ngAfterViewInit(): void {
    this.getData()
  }

}
