import { Component } from '@angular/core';

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
  tableData = {
    columns: [
      {keyName: 'id_dp', label: 'شناسه', type: 'text'}
    ],
    row: [],
    param: '',
    url: 'document-packages-general'
  }
}
