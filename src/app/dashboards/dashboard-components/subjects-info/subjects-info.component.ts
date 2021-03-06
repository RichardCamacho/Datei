import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubjectFoldersService } from 'src/app/subject-folders/subject-folders/subject-folders.service';
import { SubjectsInfoService } from './subjects-info.service';

@Component({
  selector: 'app-subjects-info',
  templateUrl: './subjects-info.component.html',
  styleUrls: ['./subjects-info.component.css']
})
export class SubjectsInfoComponent implements OnInit {

  idPrograma
  indicador;

  subjectInfoColumns: any[] = [
    { "header": 'cursos.nombre_curso', "field": "curso", "width": "25%", "typeField": 'standard' },
    { "header": 'carpeta_asig.nombre_docente', "field": "docente", "width": "40%", "typeField": 'standard' },
    { "header": 'cursos.portada', "field": "portada", "width": "25%", "typeField": 'tag' }
  ];
  selectedSubjectInfoRow; // fila seleccionada
  subjectInfoList: any[];
  subjectInfoTablePaginator = false;
  subjectInfoTableRows = 10;
  
  constructor(private subjectsInfoService: SubjectsInfoService, private toastr: ToastrService,
              private router: Router, private translate: TranslateService, private spinner: NgxSpinnerService,
              private subjectFolderService: SubjectFoldersService) { }

  ngOnInit(): void {
    this.getProgramIndicator();
  }

  getAllSubjectFoldersByProgram(){
    this.subjectsInfoService.getAllSubjects(this.indicador).subscribe((res: any) => {
      var auxres = res;
      this.subjectInfoList = auxres.map((data) => ({
        id: data.id,
        curso: data.asignatura.nombreEspaniol,
        docente: (data.usuario.segundoNombre)? data.usuario.primerNombre + ' ' + data.usuario.segundoNombre + ' ' + data.usuario.primerApellido + ' ' + data.usuario.segundoApellido: data.usuario.primerNombre + ' ' + data.usuario.primerApellido + ' ' + data.usuario.segundoApellido,
        portada: (data.asignatura.filename)? 'Subida':'No subida'
      }));
      this.subjectInfoTablePaginator = (res.length > this.subjectInfoTableRows) ? true : false;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getProgramIndicator(){
    var idPrograma = parseInt(sessionStorage.getItem('programa'));
    this.subjectFolderService.getCursoInfo(idPrograma).subscribe((res: any) => {
      switch (res.nombre) {
        case 'Ingenier??a de Sistemas':
          this.indicador = '220';
          this.getAllSubjectFoldersByProgram();
          break;
        case 'Ingenier??a de Alimentos':
          this.indicador = '221';
          this.getAllSubjectFoldersByProgram();
          break;
        case 'Ingenier??a Qu??mica':
          this.indicador = '222';
          this.getAllSubjectFoldersByProgram();
          break;
        case 'Ingenier??a Civil':
          this.indicador = '223';
          this.getAllSubjectFoldersByProgram();
          break;
        case 'Qu??mica Farmac??utica':
          this.indicador = '224';
          this.getAllSubjectFoldersByProgram();
          break;
        default:
          break;
      }
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
      
  }

  onViewFolder(id){
    this.router.navigate([`./app/subject-folder/${id}`]);
  }
}
