import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Activities } from './activities.model';
import { ActivitiesService } from './activities.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  registerActivityForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  activity: Activities;

  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedMinuteId; // id del tipo de referencia que viene del padre
  @Input() public selectedActivityId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>()
  
  timeLocale:any;

  get f() {
    return this.registerActivityForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public activitysService: ActivitiesService,
              private toastr: ToastrService, @Inject(LOCALE_ID) locale: string, private translate: TranslateService,
              private spinner: NgxSpinnerService) {

              this.timeLocale = locale;
              this.spinner.show();
  }

  ngOnInit(): void {

    this.SelectedId = this.selectedActivityId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getActivity(this.SelectedId);
    }
    this.registerActivityForm = this.formBuilder.group({
      id: [],
      descripcion: ["", [Validators.required, Validators.maxLength(100)]],
      fecha: [null, [Validators.required]],
      responsable: ["", [Validators.required, Validators.maxLength(100)]],
      idActa: [null],
    });

  }

  getActivity(id) {
    this.activitysService.getActivityById(id).subscribe((res: any) => {
      this.activity = res;
      res.fecha = formatDate(res.fecha, "yyyy-MM-dd", this.timeLocale);
      this.registerActivityForm.patchValue(res);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerActivityForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.activity = this.registerActivityForm.value;
    this.activity.idActa = this.selectedMinuteId;
    this.onCreateActivity();
  }

  onCreateActivity() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.activitysService.registerActivity(this.activity).subscribe((response: any) => {
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
      this.activitysService.updateActivity(this.activity, this.SelectedId).subscribe((response: any) => {
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
    this.registerActivityForm.reset();
  }

  //previene que en los campos se incluyan caracteres diferentes a los numericos
  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {    
      // invalida el caracter señalado y evita la entrada del mismo en el campo
      event.preventDefault();
    }
  }

}
