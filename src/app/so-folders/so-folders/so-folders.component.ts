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

  idUsuario;

  modalComponetActive = '';

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

              this.activatedRoute.params.subscribe(params => {
                this.selectedSoFolderId = params.id; // argumento enviado en la ruta
                if (this.selectedSoFolderId === undefined || this.selectedSoFolderId == null) {
                  this.mode = 'CREATE';
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
      idUsuario: [null]
    });

    this.idUsuario = parseInt(sessionStorage.getItem('user'));//rescato el id que está almacenado en la sesión
  }

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

  onRegisterMinute() {
    this.router.navigate([`./app/minute/register/${this.selectedSoFolderId}`]);
  }

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

  onRegisterContImprovement() {
    this.router.navigate([`./app/continuous-improvement/register/${this.selectedSoFolderId}`]);
  }

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

  onSubmit(){
    this.submitted = true;
    console.log(this.registerSoFolderForm.value)
    if (this.registerSoFolderForm.invalid) {
      return;
    }
    
    this.submittedUp = true;

    console.log(this.registerSoFolderForm.value)
    this.soFolder = this.registerSoFolderForm.value;
    this.soFolder.idUsuario =  this.idUsuario;
    this.onRegisterSoFolder();
  }

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

  onCancel(){
    this.submitted = false;
    this.registerSoFolderForm.reset();
    if (this.mode === 'UPDATE') {
      this.getSoFolder(this.selectedSoFolderId);
    }
  }

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
