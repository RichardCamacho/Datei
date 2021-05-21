import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { soFolder } from './so-folders.model';
import { SoFoldersService } from './so-folders.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-so-folders',
  templateUrl: './so-folders.component.html',
  styleUrls: ['./so-folders.component.css']
})
export class SoFoldersComponent implements OnInit {

  registerSoFolderForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  selectedSoFolderId; // registra el id seleccionado que viene en la URL.
  mode = ''; // identifica el modo de transaccion del componente: CREATE , UPDATE
  soFolder = new soFolder;

  idUsuario;// id de usuario 
  programaTr;//auxiliar del programa del usuario
  modalComponetActive = '';

  //parametros de translate
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  //actas de so
  minutesColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "30%", "typeField": 'standard' },
    { "header": 'carpeta_so.fecha', "field": "fechaReunion", "width": "30%", "typeField": 'date' },
    { "header": 'carpeta_so.convocado_por', "field": "convocadoPor", "width": "30%", "typeField": 'standard' }
  ];
  minutesList: any[];
  minutesTablePaginator = false;
  minutesTableRows = 10;
  selectedMinuteId; // fila seleccionada

  //actas de mejoramiento continuo
  contImprovementColumns: any[] = [
    { "header": 'carpeta_so.id_accion', "field": "accionId", "width": "30%", "typeField": 'standard' },
    { "header": 'carpeta_so.responsable', "field": "responsable", "width": "30%", "typeField": 'standard' },
  ];
  contImprovementList: any[];
  contImprovementTablePaginator = false;
  contImprovementTableRows = 10;
  selectedContImprovementId; // fila seleccionada

  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;

  get f() {
    return this.registerSoFolderForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
            private toastr: ToastrService, private soFolderService: SoFoldersService,
            private modalService: NgbModal, private translate: TranslateService,private spinner: NgxSpinnerService) { 

              this.spinner.show();
              //inicializando el componente en modo de creacion o actualizacion
              this.activatedRoute.params.subscribe(params => {
                this.selectedSoFolderId = params.id; // argumento enviado en la ruta
                if (this.selectedSoFolderId === undefined || this.selectedSoFolderId == null) {
                  this.mode = 'CREATE';
                  this.getProgramaInfo();
                  this.spinner.hide();
                } else {
                  this.mode = 'UPDATE';
                  this.getSoFolder(this.selectedSoFolderId);
                  this.getAllMinutesBySoFolder();
                  this.getContImprovementsBySoFolder();
                }
              });
    }

  ngOnInit(): void {
    this.registerSoFolderForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      codigo: ["", [Validators.required, Validators.maxLength(100)]],
      indicador: ["", [Validators.required, Validators.maxLength(10)]],
      idUsuario: [null]
    });

    this.idUsuario = parseInt(sessionStorage.getItem('user'));//rescato el id que está almacenado en la sesión
  }

  //metodo para asignar el codigo del programa para la carpeta
  getProgramaInfo(){
    var idCurso = parseInt(sessionStorage.getItem('programa'));
    this.soFolderService.getCursoInfo(idCurso).subscribe((res: any) => {
      switch (res.nombre) {
        case 'Ingeniería de Sistemas':
          this.f.indicador.setValue('220');
          this.programaTr = 'main.sistemas';
          break;
        case 'Ingeniería de Alimentos':
          this.f.indicador.setValue('221');
          this.programaTr = 'main.alimentos';
          break;
        case 'Ingeniería Química':
          this.f.indicador.setValue('222');
          this.programaTr = 'main.quimica';
          break;
        case 'Ingeniería Civil':
          this.f.indicador.setValue('223');
          this.programaTr = 'main.civil';
          break;
        case 'Química Farmacéutica':
          this.f.indicador.setValue('224');
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

  //obtiene la carpeta de SO indicada por id en el estado de UPDATE
  getSoFolder(id){
    this.soFolderService.getSoFolderById(id).subscribe((res: any) => {
      this.soFolder = res;
      this.registerSoFolderForm.patchValue(this.soFolder);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //obtiene todas las actas asociadas a la carpeta
  getAllMinutesBySoFolder(){
    this.spinner.show();
    this.soFolderService.getMinutesBySoFolder(this.selectedSoFolderId).subscribe((res: any) => {
      this.minutesList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //registrar un acta
  onRegisterMinute() {
    this.router.navigate([`./app/minute/register/${this.selectedSoFolderId}`]);
  }

  //editar un acta
  onEditMinute(id) {
    this.router.navigate([`./app/minute/${id}`]);
  }

  //borrar un registro de acta de so
  onDeleteMinute(id) {
    this.spinner.show();
    this.soFolderService.deleteMinute(id).subscribe((res: any) => {
      this.getAllMinutesBySoFolder();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  // actas de mejoramiento continuo---------------------------------------------------------------------------------------------------
  //obtiene todas las actas de mejoramiento continuo
  getContImprovementsBySoFolder() {
    this.spinner.show();
    this.soFolderService.getContImprovementsBySoFolder(this.selectedSoFolderId).subscribe((res: any) => {
      this.contImprovementList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //registro de acta de mejoramiento continuo
  onRegisterContImprovement() {
    this.router.navigate([`./app/continuous-improvement/register/${this.selectedSoFolderId}`]);
  }

  //editar acta de mejoramiento continuo
  onEditContImprovement(id) {
    this.router.navigate([`./app/continuous-improvement/${id}`]);
  }

  //borrar un registro de acta de mejoramiento continuo
  onDeleteContImprovement(id) {
    this.spinner.show();
    this.soFolderService.deleteContImprovement(id).subscribe((res: any) => {
      this.getContImprovementsBySoFolder();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  //metodo para el control de envio de la información del formulario
  onSubmit(){
    this.submitted = true;
    if (this.registerSoFolderForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.soFolder = this.registerSoFolderForm.value;
    this.soFolder.idUsuario =  this.idUsuario;
    this.onRegisterSoFolder();
  }

  //metodo para crear / actualizar el objeto carpeta de so
  onRegisterSoFolder(){
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.soFolderService.registerSoFolder(this.soFolder).subscribe( (res: any) => {
        this.soFolder = res;
        this.spinner.hide();
        this.translate.get('success_create_update').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.mode = 'UPDATE';
        this.onSaveSoFolder(this.soFolder.id);
      },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
        this.submittedUp = false;
      },
      () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.soFolderService.updateSoFolder(this.soFolder, this.soFolder.id).subscribe((res: any) => {
          this.soFolder = res;
          this.spinner.hide();
          this.translate.get('success_create_update').subscribe((res: string) => {
            this.toastr.success(res);
          });
          this.submittedUp = false;
        },
        err => {
          this.spinner.hide();
          this.toastr.error(`Error, ${err.error.message}`);
          this.submittedUp = false;
        },
        () => { }
      );
    }
  }

  //cancelar la operacion llevada en el formulario.
  onCancel(){
    this.submitted = false;
    this.registerSoFolderForm.reset();
    if (this.mode === 'UPDATE') {
      this.getSoFolder(this.selectedSoFolderId);
    }
  }

  //modal de confirmacion para el borrado
  confirmModal(confirmation: string, id, componentActive) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
      switch (componentActive) {
        case 'minutes':
          this.onDeleteMinute(id);
          break;
        case 'contImprovement':
          this.onDeleteContImprovement(id);
          break;
        default:
          break;
      }
    }, (reason) => {
      // console.log("pasado");
    });
  }

  //redireccionar al estado de edición
  onSaveSoFolder(id) {
    this.router.navigate([`./app/so-folder/${id}`]);
  }

}
