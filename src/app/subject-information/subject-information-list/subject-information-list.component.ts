import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectInformationService } from '../subject-information/subject-information.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-subject-information-list',
  templateUrl: './subject-information-list.component.html',
  styleUrls: ['./subject-information-list.component.css']
})
export class SubjectInformationListComponent implements OnInit {
  
  selectedId: number; // id del registro seleccionado
  selectedSubjectRow; // fila seleccionada

  subjectInformationColumns: any [] = [
    { "header": 'cursos.num_curso', "field": "codigo", "width": "20%" , "typeField" :'standard'},
    { "header": 'main.nombre', "field": "nombreEspaniol", "width": "30%" , "typeField" :'standard'},
    { "header": 'cursos.horas_sem', "field": "horasSemestre", "width": "25%", "typeField" :'standard'},
    { "header": 'cursos.creditos', "field": "numeroCreditos", "width": "25%" , "typeField" :'standard'}
  ];
  subjectInformationList: any[];
  subjectInformationTablePaginator = false;
  SubjectInformationTableRows = 10 ;

  idUsuario;
  
  constructor(private router: Router, private toastr: ToastrService, private subjectInformationService: SubjectInformationService,
              private modalService: NgbModal, private translate: TranslateService, private spinner: NgxSpinnerService) { 
              
              this.spinner.show();
}

  ngOnInit(): void {
    this.idUsuario = parseInt(sessionStorage.getItem('user'));
    this.getAllSubjects();
  }

  onAddSubject() {
    this.router.navigate([`/app/subject-information/register`]);
  }

  onEditSubject(id) {
    this.router.navigate([`./app/subject-information/${id}`]);
  }

  getAllSubjects() {
    this.subjectInformationService.getAllSubjects(this.idUsuario).subscribe((res: any) => {
      this.subjectInformationList = res;
      this.subjectInformationTablePaginator = (res.length > this.SubjectInformationTableRows) ? true : false;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onDeleteSubject(id) {
    this.spinner.show();
    this.subjectInformationService.deleteSubject(id).subscribe((res: any) => {
      this.getAllSubjects();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  confirmModal(confirmation: string, id) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			this.onDeleteSubject(id);
		}, (reason) => {
			// console.log("pasado");
		});
  }

}