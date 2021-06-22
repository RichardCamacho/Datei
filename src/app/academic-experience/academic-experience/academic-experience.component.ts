import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AcademicExperience } from './academic-experience.model';
import { AcademicExperienceService } from './academic-experience.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DateHelp } from 'src/app/_helpers/date-helper';

@Component({
  selector: 'app-academic-experience',
  templateUrl: './academic-experience.component.html',
  styleUrls: ['./academic-experience.component.css']
})
export class AcademicExperienceComponent implements OnInit {
  
  registerAcademicExpForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE o UPDATE
  SelectedId: number; // Id del registro seleccionado
  maxDate: Date;
  yearRange: any;

  academicExp: AcademicExperience;// objeto experiencia academica con el que trabaja el componente

  //parametros de translate
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCurriculumId; // id de la hoja de vida con la que se está trabajando
  @Input() public selectedAcademicExperienceId; // id la experiencia academica seleccionada

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  RangosList: any[]; //lista de rangos
  TiemposList: any[]; //lista de tiempos
  timeLocale:any;//hora local

  get f() {
    return this.registerAcademicExpForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public academicExpService: AcademicExperienceService,
              private toastr: ToastrService, @Inject(LOCALE_ID) locale: string, private translate: TranslateService,
              private spinner: NgxSpinnerService, private dateHelp: DateHelp) { 

              this.timeLocale = locale;
              this.spinner.show();  
              }

  ngOnInit(): void {
    this.maxDate = this.dateHelp.maxDateToday;
    this.yearRange = `1950:${this.dateHelp.year}`;

    //listas
    this.getRangos();
    this.getTiempo();
    //inicializando el componente en modo de creacion o actualizacion
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

  //obtiene la experiencia academica indicada por id en el estado de UPDATE
  getAcademicExp(id) {
    this.spinner.show();
    this.academicExpService.getAcademicExpById(id).subscribe((res: any) => {
      res.fechaFinalizacion = new Date(res.fechaFinalizacion);
      res.fechaInicio = new Date(res.fechaInicio);
      this.registerAcademicExpForm.patchValue(res);
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
    if (this.registerAcademicExpForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.academicExp = this.registerAcademicExpForm.value;
    this.academicExp.hoja_vida = this.selectedCurriculumId;
    this.onCreateAcademicExp();
  }

  //metodo para crear / actualizar el objeto experiencia academica
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

  //cancelar la operacion llevada en el formulario.
  onCancel() {
    this.onEventCancel.emit(true);
    this.cleanForm();
  }

  //limpia el formulario
  cleanForm(){
    this.submitted = false;
    this.registerAcademicExpForm.reset();
  }

  //listas
  //obtiene la lista de rangos disponibles
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
  //obtiene la lista de tiempos
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
