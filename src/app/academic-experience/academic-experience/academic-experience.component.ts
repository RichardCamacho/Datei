import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AcademicExperience } from './academic-experience.model';
import { AcademicExperienceService } from './academic-experience.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-academic-experience',
  templateUrl: './academic-experience.component.html',
  styleUrls: ['./academic-experience.component.css']
})
export class AcademicExperienceComponent implements OnInit {
  
  registerAcademicExpForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  academicExp: AcademicExperience;

  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCurriculumId; // id del tipo de referencia que viene del padre
  @Input() public selectedAcademicExperienceId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  RangosList: any[];
  TiemposList: any[];

  timeLocale:any;

  get f() {
    return this.registerAcademicExpForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public academicExpService: AcademicExperienceService,
              private toastr: ToastrService, @Inject(LOCALE_ID) locale: string, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 

              this.timeLocale = locale;
              this.spinner.show();  
              }

  ngOnInit(): void {
    
    //listas
    this.getRangos();
    this.getTiempo();

    this.SelectedId = this.selectedAcademicExperienceId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
    } else {
      this.mode = 'UPDATE' ;
      this.getAcademicExp(this.SelectedId);
    }
    this.registerAcademicExpForm = this.formBuilder.group({
      id: [],
      fechaFinalizacion: [null, [Validators.required]],
      fechaInicio: [null, [Validators.required]],
      institucion: ["", [Validators.required, Validators.maxLength(100)]],
      rango:[null, [Validators.required]],
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

  getAcademicExp(id) {
    this.spinner.show();
    this.academicExpService.getAcademicExpById(id).subscribe((res: any) => {
      res.fechaFinalizacion = formatDate(res.fechaFinalizacion, "yyyy-MM-dd", this.timeLocale);
      res.fechaInicio = formatDate(res.fechaInicio, "yyyy-MM-dd", this.timeLocale);
      this.registerAcademicExpForm.patchValue(res);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerAcademicExpForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.academicExp = this.registerAcademicExpForm.value;
    this.academicExp.hoja_vida = this.selectedCurriculumId;
    this.onCreateAcademicExp();
  }

  onCreateAcademicExp() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.academicExpService.registerAcademicExp(this.academicExp).subscribe((response: any) => {
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
      this.academicExpService.updateAcademicExp(this.academicExp, this.SelectedId).subscribe((response: any) => {
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

  onCancel() {
    this.onEventCancel.emit(true);
    this.cleanForm();
  }

  cleanForm(){
    this.submitted = false;
    this.registerAcademicExpForm.reset();
  }

  //listas
  getRangos(){
    this.spinner.show();
    this.academicExpService.getDetailsByName('Rangos').subscribe((res: any) => {
      this.RangosList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getTiempo(){
    this.spinner.show();
    this.academicExpService.getDetailsByName('Tiempos').subscribe((res: any) => {
      this.TiemposList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

}
