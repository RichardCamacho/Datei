import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectsInfoService } from './subjects-info.service';

@Component({
  selector: 'app-subjects-info',
  templateUrl: './subjects-info.component.html',
  styleUrls: ['./subjects-info.component.css']
})
export class SubjectsInfoComponent implements OnInit {

  idPrograma

  subjectInfoColumns: any[] = [
    { "header": 'cursos.nombre_curso', "field": "curso", "width": "25%", "typeField": 'standard' },
    { "header": 'carpeta_asig.nombre_docente', "field": "docente", "width": "30%", "typeField": 'standard' },
    { "header": 'cursos.portada', "field": "portada", "width": "15%", "typeField": 'tag' },
    { "header": 'cursos.objetivos', "field": "objetivos", "width": "30%", "typeField": 'standard' },
    { "header": 'carpeta_asig.so', "field": "so", "width": "30%", "typeField": 'standard' },
    { "header": 'carpeta_asig._temas', "field": "temas", "width": "15%", "typeField": 'standard' }
  ];
  selectedSubjectInfoRow; // fila seleccionada
  subjectInfoList: any[];
  subjectInfoTablePaginator = false;
  subjectInfoTableRows = 10;
  
  constructor(private subjectsInfoService: SubjectsInfoService, private toastr: ToastrService,
              private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.idPrograma = parseInt(sessionStorage.getItem('programa'));
    this.getAllFacultiesByProgram();
  }

  getAllFacultiesByProgram(){
    this.subjectsInfoService.getAllSubjects(this.idPrograma).subscribe((res: any) => {
      console.log(res);//arreglar cuando no llega el docente
      this.subjectInfoList = res.map((data) => ({
        id: data.id,
        curso: data.nombreEspaniol,
        docente: (data.profesor.segundoNombre)? data.profesor.primerNombre + ' ' + data.profesor.segundoNombre + ' ' + data.profesor.primerApellido + ' ' + data.profesor.segundoApellido: data.profesor.primerNombre + ' ' + data.profesor.primerApellido + ' ' + data.profesor.segundoApellido,
        portada: (data.filename)? 'Subida':'No subida',//usar las etiquetas de colores
        libros: data.libros.length,
        prerequisitos: (data.prerequisitos.length !== 0)? data.prerequisitos.length : 'Ninguno',
        objetivos: data.objetivos.length,
        so: data.student_outcomes.length,
        temas: data.temas_curso.length
      }));
      this.subjectInfoTablePaginator = (res.length > this.subjectInfoTableRows) ? true : false;
    },
    err => {
      
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onViewFolder(id){
    this.router.navigate([`./app/subject-folder/${id}`]);
  }
}
