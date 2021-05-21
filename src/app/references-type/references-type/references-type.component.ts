import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReferenceType } from './references-type.model';
import { ReferencesTypeService } from './references-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-references-type',
  templateUrl: './references-type.component.html',
  styleUrls: ['./references-type.component.css']
})
export class ReferencesTypeComponent implements OnInit {

  registerReferenceTypeForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  selectedId; // registra el id seleccionado que viene en la URL.
  mode = ''; // identifica el modo de transaccion del componente: CREATE , UPDATE

  //parametros de translate
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  selectedDetailId; // Id del detalle seleccionado

  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;

  get f() {
    return this.registerReferenceTypeForm.controls;
  }

  referenceType = new ReferenceType;// objeto tipo de referencia con el que trabaja el component
  selectedReferenceTypeDetailsRow; // fila seleccionada

  //detalle del tipo de referencia
  referencesTypeDetailsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' }
  ];
  referencesTypeDetailsList: any[];
  referencesTypeDetailsTablePaginator = false;
  referencesTypeDetailsTableRows = 10;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private toastr: ToastrService, private referencesTypeService: ReferencesTypeService,
    private modalService: NgbModal, private translate: TranslateService,
    private spinner: NgxSpinnerService) {

    this.spinner.show();
    //inicializando el componente en modo de creacion o actualizacion
    this.activatedRoute.params.subscribe(params => {
      this.selectedId = params.id; // argumento enviado en la ruta
      if (this.selectedId === undefined || this.selectedId == null) {
        this.mode = 'CREATE';
        this.spinner.hide();
      } else {
        this.mode = 'UPDATE';
        this.getReferenceType(this.selectedId);
        this.getReferenceTypeDetails(this.selectedId);
      }
    });

  }

  ngOnInit(): void {
    this.registerReferenceTypeForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      descripcion: ["", [Validators.required, Validators.maxLength(200)]]
    });
  }

  //obtiene un registro de tipo de referencia especificado por su ID
  getReferenceType(id) {
    this.referencesTypeService.getReferenceTypeById(id).subscribe((res: any) => {
      this.referenceType = res;
      this.registerReferenceTypeForm.patchValue(this.referenceType);
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
    if (this.registerReferenceTypeForm.invalid) {
      return;
    }
    this.submittedUp = true;
    //creando el objeto usuario porque hay un campo auxiliar de mas
    this.referenceType = this.registerReferenceTypeForm.value;
    this.onRegisterReferenceType();
  }

  //metodo para crear / actualizar el objeto experiencia academica
  onRegisterReferenceType() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.referencesTypeService.registerReferenceType(this.referenceType).subscribe((res: any) => {
        this.referenceType = res;
        this.spinner.hide();
        this.translate.get('success_create_update').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.onSaveReferenceType(this.referenceType.id);
      },
        err => {
          this.spinner.hide();
          this.toastr.error(`Error, ${err.error.message}`);
          this.submittedUp = false;
        },
        () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.referencesTypeService.updateReferenceType(this.referenceType, this.referenceType.id).subscribe(
        (res: any) => {
          this.referenceType = res;
          this.submittedUp = false;
          this.spinner.hide();
          this.translate.get('success_create_update').subscribe((res: string) => {
            this.toastr.success(res);
          });
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

  //redireccionar al estado de edición
  onSaveReferenceType(id) {
    this.router.navigate([`./app/references-type/${id}`]);
  }

  //consulta todos los detalles de un tipo de referencia
  getReferenceTypeDetails(id) {
    this.spinner.show();
    this.referencesTypeService.getDetails(id).subscribe((res: any) => {
      this.referencesTypeDetailsList = res;
      this.referencesTypeDetailsTablePaginator = (res.length > this.referencesTypeDetailsTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }

  // acciones para el botón cancelar
  onCancel() {
    this.submitted = false;
    this.registerReferenceTypeForm.reset();
    if (this.mode === 'UPDATE') {
      this.getReferenceType(this.selectedId);
    }
  }

  //agregar un detalle
  onNewReferenceTypeDetail() {
    this.mdStickUp.show();
    this.selectedDetailId = null;
  }

  //guardar el detalle
  onSaveReferenceTypeDetail() {
    this.mdStickUp.hide();
    this.getReferenceTypeDetails(this.selectedId);
  }

  //editar un detalle
  onEditReferenceTypeDetail(id) {
    this.mdStickUp.show();
    this.selectedDetailId = id;
  }

  //borrar un detalle de tipo de referencia
  onDeleteReferenceTypeDetail(id) {
    this.spinner.show();
    this.referencesTypeService.deleteReferenceTypeDetail(id).subscribe((res: any) => {
      this.getReferenceTypeDetails(this.selectedId);
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`)
      });
  }

  //modal de confirmacion
  confirmModal(confirmation: string, id) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
      this.onDeleteReferenceTypeDetail(id);
    }, (reason) => {
      // console.log("pasado");
    });
  }

}
