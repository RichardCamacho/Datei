import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FacultiesCurriculumChartService } from './faculties-curriculum-chart.service';

@Component({
  selector: 'app-faculties-curriculum-chart',
  templateUrl: './faculties-curriculum-chart.component.html',
  styleUrls: ['./faculties-curriculum-chart.component.css']
})
export class FacultiesCurriculumChartComponent implements OnInit {

  idPrograma;
  programaTr;
  curriculum = 0;
  noCurriculum = 0;
  chartReady = false;

  doughnutChartLabels: string[];
  doughnutChartData: number[];
  doughnutChartType;
  constructor(private facultiesCurriculumChartService: FacultiesCurriculumChartService, private translate: TranslateService,
              private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.idPrograma = parseInt(sessionStorage.getItem('programa'));
    this.getPrograma();
    this.getAllFacultiesByProgram();
  }

  getAllFacultiesByProgram(){
    this.spinner.show();
    this.facultiesCurriculumChartService.getAllUsersCurriculum(this.idPrograma).subscribe((res: any) => {
      res.forEach(faculty => {
        if(faculty.curriculum){
          this.curriculum++
        }else{
          this.noCurriculum++
        }
      });
      this.initializeChart(this.curriculum, this.noCurriculum);
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getPrograma(){
    this.facultiesCurriculumChartService.getCursoInfo(this.idPrograma).subscribe((res: any) => {
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

  //Chart
  initializeChart(yes, no){
    this.doughnutChartLabels = [
      'Realizado',
      'No Realizado'
    ];
    this.doughnutChartData = [yes, no];
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
