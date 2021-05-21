import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Prerequisite } from './prerequisites.model';
import { PrerequisitesService } from './prerequisites.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-prerequisites',
  templateUrl: './prerequisites.component.html',
  styleUrls: ['./prerequisites.component.css']
})
export class PrerequisitesComponent implements OnInit {

  registerPrerequisiteForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  prerequisite: Prerequisite;// objeto prerequisito con el que trabaja el componente

  //parametros de translate
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  tipoList:any[];

  @Input() public selectedSubjectId; // id del curso o asignatura con la que se trabaja
  @Input() public selectedPrerequisiteId; // id del prerequisito seleccionado

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerPrerequisiteForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public prerequisitesService: PrerequisitesService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) {

              this.spinner.show();
  }

  ngOnInit(): void {
    //listas
    this.getTipos();
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedPrerequisiteId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      } else {
        this.mode = 'UPDATE' ;
        this.getPrerequisite(this.SelectedId);
    }
    this.registerPrerequisiteForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      curso: [null],
      tipo: [null, [Validators.required]],
    });

  }

  //obtiene el prerequisito indicado por id en el estado de UPDATE
  getPrerequisite(id) {
    this.prerequisitesService.getPrerequisiteById(id).subscribe((res: any) => {
      this.registerPrerequisiteForm.patchValue(res);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //metodo para el control de envio de la información del formulario
  onSubmit() {
    this.submitted = true;
    if (this.registerPrerequisiteForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.prerequisite = this.registerPrerequisiteForm.value;
    this.prerequisite.curso = this.selectedSubjectId;
    this.onCreatePrerequisite();
  }

  //metodo para crear / actualizar el objeto experiencia academica
  onCreatePrerequisite() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.prerequisitesService.registerPrerequisite(this.prerequisite).subscribe((response: any) => {
        this.spinner.hide();
        this.translate.get('success_create_update').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.onEventSave.emit(true);
        this.cleanForm();
        this.submittedUp = false;
      },
        err => {
          this.spinner.hide();
          this.toastr.error(`Error, ${err.error.message}`);
          this.submittedUp = false;
        },
        () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.prerequisitesService.updatePrerequisite(this.prerequisite, this.SelectedId).subscribe((response: any) => {
        this.spinner.hide();
        this.translate.get('success_create_update').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.onEventSave.emit(true);
        this.cleanForm();
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
  onCancel() {
    this.onEventCancel.emit(true);
    this.cleanForm();
  }

  //limpia el formulario
  cleanForm(){
    this.submitted = false;
    this.registerPrerequisiteForm.reset();
  }

  //listas
  //litas de tipos registrados en el sistema
  getTipos(){
    this.spinner.show();
    this.prerequisitesService.getDetailsByName('Requisitos').subscribe((res: any) => {
      this.tipoList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

}
