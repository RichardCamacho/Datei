import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Attendants } from './attendants.model';
import { AttendantsService } from './attendants.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.css']
})
export class AttendantsComponent implements OnInit {

  registerAttendantForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  attendant: Attendants;

  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedMinuteId; // id del tipo de referencia que viene del padre
  @Input() public selectedAttendantId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerAttendantForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public attendantsService: AttendantsService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) {

              this.spinner.show();

  }

  ngOnInit(): void {

    this.SelectedId = this.selectedAttendantId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getAttendant(this.SelectedId);
    }
    this.registerAttendantForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      posicion: ["", [Validators.required, Validators.maxLength(100)]],
      asistencia: [false, [Validators.required]],
      excusa: [false],
      idActa: [null],
    });

    this.f.asistencia.valueChanges.subscribe(res => {
      if(this.f.asistencia.value !== false){
        this.f.excusa.disable();
      }else{
        this.f.excusa.enable();
      }
    });
  }

  getAttendant(id) {
    this.attendantsService.getAttendantById(id).subscribe((res: any) => {
      this.registerAttendantForm.patchValue(res);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    
    this.submitted = true;
    if (this.registerAttendantForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.attendant = this.registerAttendantForm.value;
    this.attendant.idActa = this.selectedMinuteId;
    this.attendant.excusa = (this.f.excusa.disabled)? false: this.f.excusa.value;
    this.onCreateAttendant();
  }

  onCreateAttendant() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.attendantsService.registerAttendant(this.attendant).subscribe((response: any) => {
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
      this.attendantsService.updateAttendant(this.attendant, this.SelectedId).subscribe((response: any) => {
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
    this.registerAttendantForm.reset();
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