import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {DialogService} from 'primeng/dynamicdialog';
import { DialogLookupService } from './dialog-lookup.service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-lookup',
  templateUrl: './dialog-lookup.component.html',
  styleUrls: ['./dialog-lookup.component.css'],
  providers: [DialogService]
})
export class DialogLookupComponent implements OnInit {

  ////// propiedades recbidas desde el objeto data
  service = '';
  cols: any[]; // arreglo de columna
  arrayData: any[] = [];  // determina si se cargan los datos desde un servicio o no
  ////// fin propiedades

  items: any[] = []; //  arreglo de elementos
  selectedItem: any ; //  item seleccionado

  paginatorStatus = false;
  rowsDetail = 5 ;

  loading: boolean; // determinar estado de carga de datos

  constructor(private dialogLookupService: DialogLookupService, private toastr: ToastrService,
              public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.onGetAllItems();
    this.cols = this.config.data.cols;
  }

  onGetAllItems() {
    this.loading = true;
    this.items = [];
    this.service = this.config.data.service;

    if (this.config.data.service) {
      this.dialogLookupService.getAllItems(this.service).subscribe ((res: any) => {
        console.log(res)
        this.items = res;
        this.loading = false ;
        this.paginatorStatus = (res.length > this.rowsDetail) ? true : false;
      },
      err => {
        this.loading = false ;
        this.toastr.error('Error en la ejecución del servicio');//traducir
      });
    } else {
        console.log(this.config.data.arrayData)
        this.items = this.config.data.arrayData;
        this.loading = false ;
        this.paginatorStatus = (this.items.length > this.rowsDetail) ? true : false;
      
    }
  }

  selectRow(rowData) {
    this.ref.close(rowData);
  }

}
