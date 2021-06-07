import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SoFoldersService } from 'src/app/so-folders/so-folders/so-folders.service';
import { SubjectFoldersService } from 'src/app/subject-folders/subject-folders/subject-folders.service';
import { SoFoldersInfoService } from './so-folders-info.service';

@Component({
  selector: 'app-so-folders-info',
  templateUrl: './so-folders-info.component.html',
  styleUrls: ['./so-folders-info.component.css']
})
export class SoFoldersInfoComponent implements OnInit {

  idPrograma
  indicador;

  SoFoldersColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "25%", "typeField": 'standard' },
    { "header": 'main.codigo', "field": "codigo", "width": "25%", "typeField": 'standard' },
    { "header": 'carpeta_asig.nombre_docente', "field": "docente", "width": "40%", "typeField": 'standard' }
  ];
  selectedSoFolderRow; // fila seleccionada
  SoFoldersList: any[];
  SoFoldersTablePaginator = false;
  SoFoldersTableRows = 10;
  
  constructor(private soFoldersInfoService: SoFoldersInfoService, private toastr: ToastrService,
              private router: Router, private translate: TranslateService, private spinner: NgxSpinnerService,
              private subjectFolderService: SubjectFoldersService) { }

  ngOnInit(): void {
    this.getProgramIndicator();
  }

  getAllSoFoldersByProgram(){
    this.soFoldersInfoService.getAllSoFolders(this.indicador).subscribe((res: any) => {
      var auxres = res;
      this.SoFoldersList = auxres.map((data) => ({
        id: data.id,
        nombre: data.nombre,
        codigo: data.codigo,
        docente: (data.usuario.segundoNombre)? data.usuario.primerNombre + ' ' + data.usuario.segundoNombre + ' ' + data.usuario.primerApellido + ' ' + data.usuario.segundoApellido: data.usuario.primerNombre + ' ' + data.usuario.primerApellido + ' ' + data.usuario.segundoApellido,
      }));
      this.SoFoldersTablePaginator = (res.length > this.SoFoldersTableRows) ? true : false;
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
        case 'Ingeniería de Sistemas':
          this.indicador = '220';
          this.getAllSoFoldersByProgram();
          break;
        case 'Ingeniería de Alimentos':
          this.indicador = '221';
          this.getAllSoFoldersByProgram();
          break;
        case 'Ingeniería Química':
          this.indicador = '222';
          this.getAllSoFoldersByProgram();
          break;
        case 'Ingeniería Civil':
          this.indicador = '223';
          this.getAllSoFoldersByProgram();
          break;
        case 'Química Farmacéutica':
          this.indicador = '224';
          this.getAllSoFoldersByProgram();
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
    this.router.navigate([`./app/so-folder/${id}`]);
  }

}
