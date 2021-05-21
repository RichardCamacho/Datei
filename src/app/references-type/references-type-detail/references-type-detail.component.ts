import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReferenceTypeDetail } from './references-type-detail.model';
import { ReferencesTypeDetailService } from './references-type-detail.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-references-type-detail',
  templateUrl: './references-type-detail.component.html',
  styleUrls: ['./references-type-detail.component.css']
})
export class ReferencesTypeDetailComponent implements OnInit {

  registerReferenceTypeDetailForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  referenceTypesDetail: ReferenceTypeDetail;// objeto detalle tipo de referencia con el que trabaja el componente

  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado
  
  //parametros de translate
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public SelectedTypeReferenceId; // id del tipo de referencia que viene del padre
  @Input() public selectedDetailId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();
  
  get f() {
    return this.registerReferenceTypeDetailForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public referenceTypeDetailService: ReferencesTypeDetailService,
              private toastr: ToastrService, private translate: TranslateService, private spinner: NgxSpinnerService) {

              this.spinner.show();
  }

  ngOnInit(): void {
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedDetailId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getReferenceTypeDetail(this.SelectedId);
    }
    this.registerReferenceTypeDetailForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      tipoReferencia:[null]
    });

  }

  //obtiene el detalle de tipo de referencia indicado por id en el estado de UPDATE
  getReferenceTypeDetail(id) {
    this.referenceTypeDetailService.getReferenceTypeDetailById(id).subscribe((res: any) => {
      this.registerReferenceTypeDetailForm.patchValue(res);
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
    if (this.registerReferenceTypeDetailForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.referenceTypesDetail = this.registerReferenceTypeDetailForm.value;
    this.referenceTypesDetail.tipoReferencia = this.SelectedTypeReferenceId;
    this.onCreateReferenceTypeDetail();
  }

  //metodo para crear / actualizar el objeto detalle tipo de referencia
  onCreateReferenceTypeDetail() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.referenceTypeDetailService.registerReferenceTypeDetail(this.referenceTypesDetail).subscribe((response: any) => {
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
      this.referenceTypeDetailService.updateReferenceTypeDetail(this.referenceTypesDetail, this.SelectedId).subscribe((response: any) => {
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
    this.registerReferenceTypeDetailForm.reset();
  }

}
