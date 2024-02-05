import { Component } from '@angular/core';
import {Table} from "../shared/interfaces/table";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'dynamicTable';
  columns = [
    {
      name: 'id',
      displayName: 'شناسه'
    }]
  tableData:Table = {
    columns: [
      {keyName: 'id_dp', label: 'شناسه'}
    ],
    row: [],
    url: 'https://65c0823a25a83926ab966927.mockapi.io/api/v1/users'
  }
}
