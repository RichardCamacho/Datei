import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectFoldersService } from '../subject-folders/subject-folders.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-subject-folders-list',
  templateUrl: './subject-folders-list.component.html',
  styleUrls: ['./subject-folders-list.component.css']
})
export class SubjectFoldersListComponent implements OnInit {

  subjectFolder: any[]; /// objecto recuperado del servicio de busqueda
  selectedId: number; // id del registro seleccionado
  selectedSubjectFolderRow; // fila seleccionada

  subjectFolderColumns: any[] = [
    { "header": 'main.codigo', "field": "codigo", "width": "15%", "typeField": 'standard' },
    { "header": 'main.nombre', "field": "nombre", "width": "35%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "25%", "typeField": 'date' },
    { "header": 'main.fecha_edicion', "field": "updated_at", "width": "25%", "typeField": 'date' }
  ];
  subjectFolderList: any[];
  subjectFolderTablePaginator = false;
  subjectFolderTableRows = 10;

  idUsuario;

  constructor(private router: Router, private toastr: ToastrService, private subjectFolderService: SubjectFoldersService,
              private modalService: NgbModal, private translate: TranslateService, private spinner: NgxSpinnerService) {  

              this.spinner.show();
  }

  ngOnInit(): void {
    this.idUsuario = parseInt(sessionStorage.getItem('user'));//rescato el id que está almacenado en la sesión
    console.log(this.idUsuario);
    this.getAllSubjectFolder();
  }

  onAddSubjectFolder() {
    this.router.navigate([`/app/subject-folder/register`]);
  }

  onEditSubjectFolder(id) {
    this.router.navigate([`./app/subject-folder/${id}`]);
  }

  getAllSubjectFolder() {
    this.subjectFolderService.getAllSubjectFolderByUser(this. idUsuario).subscribe((res: any) => {
      console.log(res)
      this.subjectFolderList = res;
      this.subjectFolderTablePaginator = (res.length > this.subjectFolderTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }

  onDeleteSubjectFolder(id) {
    this.spinner.show();
    this.subjectFolderService.deleteSubjectFolder(id).subscribe((res: any) => {
      this.spinner.hide();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
      this.getAllSubjectFolder();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  confirmModal(confirmation: string, id) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			this.onDeleteSubjectFolder(id);
		}, (reason) => {
			// console.log("pasado");
		});
  }

}
