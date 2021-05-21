import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Organizations } from './organizations.model';
import { OrganizationsService } from './organizations.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  registerOrganizationForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  organization: Organizations;// objeto organizacion con el que trabaja el componente

  //parametros de translate
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCurriculumId; // id de la hoja de vida con la que se esta trabajando
  @Input() public selectedOrganizationId; // id de la organizacion seleccionada

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerOrganizationForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public organizationsService: OrganizationsService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) {
              
              this.spinner.show();
  }

  ngOnInit(): void {
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedOrganizationId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getOrganization(this.SelectedId);
    }
    this.registerOrganizationForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      hoja_vida: [null],
    });

  }

  //obtiene la organizacion indicada por id en el estado de UPDATE
  getOrganization(id) {
    this.organizationsService.getOrganizationById(id).subscribe((res: any) => {
      this.registerOrganizationForm.patchValue(res);
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
    if (this.registerOrganizationForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.organization = this.registerOrganizationForm.value;
    this.organization.hoja_vida = this.selectedCurriculumId;
    this.onCreateOrganization();
  }

  //metodo para crear / actualizar el objeto organizacion
  onCreateOrganization() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.organizationsService.registerOrganization(this.organization).subscribe((response: any) => {
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
      this.organizationsService.updateOrganization(this.organization, this.SelectedId).subscribe((response: any) => {
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
    this.registerOrganizationForm.reset();
  }

}
