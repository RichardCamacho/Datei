import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectFoldersService } from 'src/app/subject-folders/subject-folders/subject-folders.service';
import { FoldersService } from '../folders/folders.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.css']
})
export class FoldersListComponent implements OnInit {

  folder: any[]; /// objeto recuperado del servicio de busqueda
  selectedId: number; // id del registro seleccionado

  folderColumns: any[] = [
    { "header": 'main.codigo', "field": "codigo", "width": "15%", "typeField": 'standard' },
    { "header": 'main.usuario', "field": "usuario", "width": "35%", "typeField": 'standard' },
    { "header": 'main.nombre', "field": "nombre", "width": "25%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "15%", "typeField": 'date' },
    { "header": 'main.fecha_edicion', "field": "updated_at", "width": "15%", "typeField": 'date' }
  ];
  folderList: any[];
  folderTablePaginator = false;
  folderTableRows = 10;
  selectedFolderRow; // fila seleccionada

  soFolderColumns: any[] = [
    { "header": 'main.codigo', "field": "codigo", "width": "15%", "typeField": 'standard' },
    { "header": 'main.usuario', "field": "usuario", "width": "35%", "typeField": 'standard' },
    { "header": 'main.nombre', "field": "nombre", "width": "25%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "15%", "typeField": 'date' },
    { "header": 'main.fecha_edicion', "field": "updated_at", "width": "15%", "typeField": 'date' }
  ];
  soFolderList: any[];
  soFolderTablePaginator = false;
  soFolderTableRows = 10;
  selectedSoFolderRow; // fila seleccionada

  constructor(private router: Router, private toastr: ToastrService, private folderService: FoldersService,
              private modalService: NgbModal, private translate: TranslateService,
              private spinner: NgxSpinnerService) {  
              
  }

  ngOnInit(): void {
    this.getAllSubjectFolders();
    this.getAllSoFolders();
  }

  getAllSubjectFolders() {
    this.spinner.show();
    this.folderService.getAllSubjectFolders().subscribe((res: any) => {
      this.folderList = res.map((data) => ({
        id: data.id,
        codigo: data.codigo,
        created_at: data.created_at,
        updated_at: data.updated_at,
        curriculum: data.curriculum,
        nombre: data.nombre,
        usuario: (data.usuario.segundoNombre)? data.usuario.primerNombre + ' ' + data.usuario.segundoNombre + ' ' + data.usuario.primerApellido + ' ' + data.usuario.segundoApellido: data.usuario.primerNombre + ' ' + data.usuario.primerApellido + ' ' + data.usuario.segundoApellido
      }));
      this.folderTablePaginator = (res.length > this.folderTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }

  onDeleteSubjectFolder(id) {
    this.spinner.show();
    this.folderService.deleteSubjectFolder(id).subscribe((res: any) => {
      this.getAllSubjectFolders();
      this.translate.get('success_delete').subscribe((res: string) => {
          this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  getAllSoFolders() {
    this.spinner.show();
    this.folderService.getAllSoFolders().subscribe((res: any) => {
      this.soFolderList = res.map((data) => ({
        id: data.id,
        codigo: data.codigo,
        created_at: data.created_at,
        updated_at: data.updated_at,
        curriculum: data.curriculum,
        nombre: data.nombre,
        usuario: (data.usuario.segundoNombre)? data.usuario.primerNombre + ' ' + data.usuario.segundoNombre + ' ' + data.usuario.primerApellido + ' ' + data.usuario.segundoApellido: data.usuario.primerNombre + ' ' + data.usuario.primerApellido + ' ' + data.usuario.segundoApellido
      }));
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
    this.folderService.deleteSoFolder(id).subscribe((res: any) => {
      this.getAllSoFolders();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  confirmModal(confirmation: string, id, componentActive) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
      switch (componentActive) {
        case 'subjectFolder':
          this.onDeleteSubjectFolder(id);
          break;
        case 'soFolder':
          this.onDeleteSoFolder(id);
          break;
        default:
          break;
      }
		}, (reason) => {
			// console.log("pasado");
		});
  }

}
