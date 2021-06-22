import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FacultiesCurriculumService } from './faculties-curriculum.service';

@Component({
  selector: 'app-faculties-curriculum',
  templateUrl: './faculties-curriculum.component.html',
  styleUrls: ['./faculties-curriculum.component.css']
})
export class FacultiesCurriculumComponent implements OnInit {

  idPrograma;
  programaTr;
  facultiesList: any = [];

  constructor(private facultiesCurriculumService: FacultiesCurriculumService, private translate: TranslateService,
              private spinner: NgxSpinnerService, private toastr: ToastrService) {
    
    this.spinner.show(); }

  ngOnInit(): void {
    this.idPrograma = parseInt(sessionStorage.getItem('programa'));
    this.getPrograma();
    this.getAllFacultiesByProgram();
  }

  getAllFacultiesByProgram(){
    this.spinner.show();
    this.facultiesCurriculumService.getAllUsersCurriculum(this.idPrograma).subscribe((res: any) => {
      this.facultiesList = res.map((data) => ({
        id: data.id,
        rango: data.rango.nombre,
        nombre: (data.segundoNombre)? data.primerNombre + ' ' + data.segundoNombre + ' ' + data.primerApellido + ' ' + data.segundoApellido: data.primerNombre + ' ' + data.primerApellido + ' ' + data.segundoApellido,
        curriculum: (data.curriculum)? 'Realizada' : 'Pendiente'
      }));
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getPrograma(){
    this.facultiesCurriculumService.getCursoInfo(this.idPrograma).subscribe((res: any) => {
      switch (res.nombre) {
        case 'Ingeniería de Sistemas':
          this.programaTr = 'main.sistemas';
          break;
        case 'Ingeniería de Alimentos':
          this.programaTr = 'main.alimentos';
          break;
        case 'Ingeniería Química':
          this.programaTr = 'main.quimica';
          break;
        case 'Ingeniería Civil':
          this.programaTr = 'main.civil';
          break;
        case 'Química Farmacéutica':
          this.programaTr = 'main.farmaceutica';
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
}
