import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FacultiesService } from './faculties.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css']
})
export class FacultiesComponent implements OnInit {

  idPrograma;
  facultiesList: any = [];
  programaTr;

  constructor(private facultiesService: FacultiesService, private translate: TranslateService,
              private spinner: NgxSpinnerService, private toastr: ToastrService) {
              
              this.spinner.show(); }

  ngOnInit(): void {
    this.idPrograma = parseInt(sessionStorage.getItem('programa'));
    this.getPrograma();
    this.getAllFacultiesByProgram();
  }

  getAllFacultiesByProgram(){
    this.facultiesService.getAllUsersByProgram(this.idPrograma).subscribe((res: any) => {

      this.facultiesList = res.map((data) => ({
        id: data.id,
        rango: data.rango.nombre,
        nombre: (data.segundoNombre)? data.primerNombre + ' ' + data.segundoNombre + ' ' + data.primerApellido + ' ' + data.segundoApellido: data.primerNombre + ' ' + data.primerApellido + ' ' + data.segundoApellido,
        rol: data.rol.nombre
      }));
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getPrograma(){
    this.facultiesService.getCursoInfo(this.idPrograma).subscribe((res: any) => {
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
