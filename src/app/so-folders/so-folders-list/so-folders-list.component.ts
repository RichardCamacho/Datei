import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SoFoldersService } from '../so-folders/so-folders.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-so-folders-list',
  templateUrl: './so-folders-list.component.html',
  styleUrls: ['./so-folders-list.component.css']
})
export class SoFoldersListComponent implements OnInit {

  soFolder: any[]; /// objecto recuperado del servicio de busqueda
  selectedSoFolderId: number; // id del registro seleccionado

  soFolderColumns: any[] = [
    { "header": 'main.codigo', "field": "codigo", "width": "15%", "typeField": 'standard' },
    { "header": 'main.nombre', "field": "nombre", "width": "35%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "25%", "typeField": 'date' },
    { "header": 'main.fecha_edicion', "field": "updated_at", "width": "25%", "typeField": 'date' }
  ];
  soFolderList: any[];
  soFolderTablePaginator = false;
  soFolderTableRows = 10;
  selectedSoFolderRow; // fila seleccionada

  idUsuario;

  constructor(private router: Router, private toastr: ToastrService, private soFolderService: SoFoldersService,
              private modalService: NgbModal, private translate: TranslateService, private spinner: NgxSpinnerService) {
              this.spinner.show();
  }

  ngOnInit(): void {
    this.idUsuario = parseInt(sessionStorage.getItem('user'));//rescato el id que está almacenado en la sesión
    this.getAllSoFolder();
  }

  onAddSoFolder() {
    this.router.navigate([`/app/so-folder/register`]);
  }

  onEditSoFolder(id) {
    this.router.navigate([`./app/so-folder/${id}`]);
  }

  getAllSoFolder() {
    this.soFolderService.getAllSoFolderByUser(this.idUsuario).subscribe((res: any) => {
      this.soFolderList = res;
      this.soFolderTablePaginator = (res.length > this.soFolderTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }

  onDeleteSoFolder(id) {
    this.spinner.show();
    this.soFolderService.deleteSoFolder(id).subscribe((res: any) => {
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
      this.getAllSoFolder();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`)
      });
  }

  confirmModal(confirmation: string, id) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
      this.onDeleteSoFolder(id);
    }, (reason) => {
      // console.log("pasado");
    });
  }

}
