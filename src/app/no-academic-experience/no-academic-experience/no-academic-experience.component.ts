import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NoAcademicExperience } from './no-academic-experience.model';
import { NoAcademicExperienceService } from './no-academic-experience.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-no-academic-experience',
  templateUrl: './no-academic-experience.component.html',
  styleUrls: ['./no-academic-experience.component.css']
})
export class NoAcademicExperienceComponent implements OnInit {
  
  registerNoAcademicExpForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  noAcademicExp: NoAcademicExperience;// objeto experiencia no academica con el que trabaja el componente

  //parametros de translate
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCurriculumId; // id de la hoja de vida con la que se está trabajando
  @Input() public selectedNoAcademicExperienceId; // id la experiencia no academica seleccionada

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  TiemposList: any[];//lista de tiempos registrados en el sistema
  timeLocale:any;//tiempo local

  get f() {
    return this.registerNoAcademicExpForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public noAcademicExpService: NoAcademicExperienceService,
              private toastr: ToastrService, @Inject(LOCALE_ID) locale: string, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 

              this.timeLocale = locale;
              this.spinner.show();  
  }

  ngOnInit(): void {

    //listas
    this.getTiempo();
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedNoAcademicExperienceId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getNoAcademicExp(this.SelectedId);
    }
    this.registerNoAcademicExpForm = this.formBuilder.group({
      id: [],
      fechaFinalizacion: [null, [Validators.required]],
      fechaInicio: [null, [Validators.required]],
      compania: ["", [Validators.required, Validators.maxLength(100)]],
      descripcion: ["", [Validators.required, Validators.maxLength(100)]],
      tiempo:[null, [Validators.required]],
      titulo: ["", [Validators.required, Validators.maxLength(100)]],
      hoja_vida: [null],
    },
    {
      validator: this.valFechas()
    }
    );

  }

  //validador de fechafinal < a fecha inicial
  valFechas() {
    return (formGroup: FormGroup) => {
      const controlFechaInicio = formGroup.controls.fechaInicio;
      const controlfechaFin = formGroup.controls.fechaFinalizacion;

      if (controlfechaFin.errors && !controlfechaFin.errors.invalidDate) {
        return;
      }

      if (controlFechaInicio.value > controlfechaFin.value) {
          controlfechaFin.setErrors({ invalidDate: true });
      } else {
        controlfechaFin.setErrors(null);
      }
    };
  }

  //obtiene la experiencia no academica indicada por id en el estado de UPDATE
  getNoAcademicExp(id) {
    this.noAcademicExpService.getNoAcademicExpById(id).subscribe((res: any) => {
      res.fechaFinalizacion = formatDate(res.fechaFinalizacion, "yyyy-MM-dd", this.timeLocale);
      res.fechaInicio = formatDate(res.fechaInicio, "yyyy-MM-dd", this.timeLocale);
      this.registerNoAcademicExpForm.patchValue(res);
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
    if (this.registerNoAcademicExpForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.noAcademicExp = this.registerNoAcademicExpForm.value;
    this.noAcademicExp.hoja_vida = this.selectedCurriculumId;

    this.onCreateNoAcademicExp();
  }

  //metodo para crear / actualizar el objeto experiencia no academica
  onCreateNoAcademicExp() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.noAcademicExpService.registerNoAcademicExp(this.noAcademicExp).subscribe((response: any) => {
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
      this.noAcademicExpService.updateNoAcademicExp(this.noAcademicExp, this.SelectedId).subscribe((response: any) => {
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
    this.registerNoAcademicExpForm.reset();
  }

  //listas
  getTiempo(){
    this.spinner.show();
    this.noAcademicExpService.getDetailsByName('Tiempos').subscribe((res: any) => {
      this.TiemposList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

}
