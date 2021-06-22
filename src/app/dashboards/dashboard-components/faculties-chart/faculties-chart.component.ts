import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FacultiesService } from '../faculties/faculties.service';
import { FacultiesChartService } from './faculties-chart.service';

@Component({
  selector: 'app-faculties-chart',
  templateUrl: './faculties-chart.component.html',
  styleUrls: ['./faculties-chart.component.css']
})
export class FacultiesChartComponent implements OnInit {

  idPrograma;
  facultiesList: any = [];
  programaTr;
  chartReady = false;

  doughnutChartLabels: string[];
  doughnutChartData: number[];
  doughnutChartType;

  countCoordinador = 0;
  countLiderSo = 0;
  countDocente = 0;

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
      res.forEach(faculty => {
        if(faculty.rol.nombre === 'Docente'){
          this.countDocente++
        }else if(faculty.rol.nombre === 'Coordinador'){
          this.countCoordinador++
        }else{
          this.countLiderSo++
        }
      });
      this.initializeChart(this.countDocente,this.countCoordinador,this.countLiderSo);
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

  initializeChart(docent, coord, lider){
    this.doughnutChartLabels = [
      'Docentes',
      'Coordinadores',
      'Lideres SO'
    ];
    this.doughnutChartData = [docent, coord, lider];
    this.doughnutChartType = 'doughnut';
    this.chartReady =  true;
    this.spinner.hide();
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

}
