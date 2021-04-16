import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceActivity } from './service-activities.model';
import { ServiceActivitiesService } from './service-activities.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-service-activities',
  templateUrl: './service-activities.component.html',
  styleUrls: ['./service-activities.component.css']
})
export class ServiceActivitiesComponent implements OnInit {

  registerServiceActivForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  serviceActiv: ServiceActivity;

  @Input() public selectedCurriculumId; // id del tipo de referencia que viene del padre
  @Input() public selectedServiceActivityId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  RangosList: any[];
  TiemposList: any[];

  timeLocale:any;

  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  get f() {
    return this.registerServiceActivForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public serviceActivService: ServiceActivitiesService,
              private toastr: ToastrService, @Inject(LOCALE_ID) locale: string, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 

              this.timeLocale = locale;
              this.spinner.show(); 
              }

  ngOnInit(): void {
    this.SelectedId = this.selectedServiceActivityId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getServiceActiv(this.SelectedId);
    }
    this.registerServiceActivForm = this.formBuilder.group({
      id: [],
      fechaFinalizacion: [null, [Validators.required]],
      fechaInicio: [null, [Validators.required]],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      entidad: ["", [Validators.required, Validators.maxLength(100)]],
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

  getServiceActiv(id) {
    this.serviceActivService.getServiceActivityById(id).subscribe((res: any) => {
      res.fechaFinalizacion = formatDate(res.fechaFinalizacion, "yyyy-MM-dd", this.timeLocale);
      res.fechaInicio = formatDate(res.fechaInicio, "yyyy-MM-dd", this.timeLocale);
      this.registerServiceActivForm.patchValue(res);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerServiceActivForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.serviceActiv = this.registerServiceActivForm.value;
    this.serviceActiv.hoja_vida = this.selectedCurriculumId;
    this.onCreateServiceActiv();
  }

  onCreateServiceActiv() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.serviceActivService.registerServiceActivity(this.serviceActiv).subscribe((response: any) => {
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
      this.serviceActivService.updateServiceActivity(this.serviceActiv, this.SelectedId).subscribe((response: any) => {
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
    this.registerServiceActivForm.reset();
  }

}