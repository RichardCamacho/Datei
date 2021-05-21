import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CoursesService } from '../courses/courses.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  selectedId: number; // id del registro seleccionado
  selectedCourseRow; // fila seleccionada

  //aspectos de la tabla de cursos
  coursesColumns: any [] = [
    { "header": 'main.codigo', "field": "codigo", "width": "15%" , "typeField" :'standard'},
    { "header": 'main.nombre', "field": "nombreEspaniol", "width": "25%" , "typeField" :'standard'},
    { "header": 'carpeta_asig.tipo_curso', "field": "tipoCurso", "width": "25%" , "typeField" :'standard'}
  ];
  coursesList: any[];
  coursesTablePaginator = false;
  coursesTableRows = 10 ;
  
  constructor(private router: Router, private toastr: ToastrService, private courseService: CoursesService,
              private modalService: NgbModal, private translate: TranslateService, private spinner: NgxSpinnerService) { 

              this.spinner.show();
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  //agregar curso, redirecciona al formulario
  onAddCourse() {
    this.router.navigate([`/app/courses/register`]);
  }

  //editar curso, redirecciona al formulario
  onEditCourse(id) {
    this.router.navigate([`./app/courses/${id}`]);
  }

  //obtiene todos los registros de curso
  getAllCourses() {
    this.courseService.getAllCourses().subscribe((res: any) => {
      this.coursesList = res.map((data) => ({
        id: data.id,
        codigo: data.codigo,
        nombreEspaniol: data.nombreEspaniol,
        tipoCurso: data.tipo_curso.nombre
      }));
      this.coursesTablePaginator = (res.length > this.coursesTableRows) ? true : false;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //eliminar registro de curso
  onDeleteCourse(id) {
    this.spinner.show();
    this.courseService.deleteCourse(id).subscribe((res: any) => {
      this.getAllCourses();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  //modal de confirmacion para eliminar
  confirmModal(confirmation: string, id) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			this.onDeleteCourse(id);
		}, (reason) => {
			// console.log("pasado");
		});
  }

}