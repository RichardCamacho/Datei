import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Schooling } from './schooling.model';
import { SchoolingService } from './schooling.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-schooling',
  templateUrl: './schooling.component.html',
  styleUrls: ['./schooling.component.css']
})
export class SchoolingComponent implements OnInit {

  registerSchoolingForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  schooling: Schooling;

  param10 = {value: '10'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCurriculumId; // id del tipo de referencia que viene del padre
  @Input() public selectedSchoolingId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerSchoolingForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public schoolingService: SchoolingService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 

              this.spinner.show();
  }

  ngOnInit(): void {

    this.SelectedId = this.selectedSchoolingId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getSchooling(this.SelectedId);
    }
    this.registerSchoolingForm = this.formBuilder.group({
      id: [],
      anioTerminacion: ["", [Validators.required, Validators.maxLength(10)]],
      curso: ["", [Validators.required, Validators.maxLength(100)]],
      disciplina: ["", [Validators.required, Validators.maxLength(100)]],
      institucion: ["", [Validators.required, Validators.maxLength(100)]],
      hoja_vida: [null],
    });

  }

  getSchooling(id) {
    this.schoolingService.getSchoolingById(id).subscribe((res: any) => {
      this.registerSchoolingForm.patchValue(res);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerSchoolingForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.schooling = this.registerSchoolingForm.value;
    this.schooling.hoja_vida = this.selectedCurriculumId;
    this.onCreateSchooling();
  }

  onCreateSchooling() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.schoolingService.registerSchooling(this.schooling).subscribe((response: any) => {
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
      this.schoolingService.updateSchooling(this.schooling, this.SelectedId).subscribe((response: any) => {
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
    this.registerSchoolingForm.reset();
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
