import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Docente } from './faculty.model';
import { FacultyService } from './faculty.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogLookupComponent } from 'src/app/shared/dialog-lookup/dialog-lookup.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  registerFacultyForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  faculty: Docente;// objeto docente con el que trabaja el componente
  ref: DynamicDialogRef;
  docente: string = '';
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado
  grupoList: any[] = [];//lista de tipos de curso
  
  //parametros de translate
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCourseId; // id de la asignatura con la que se trabaja
  @Input() public selectedFacultyId; // id del docente seleccionado
  @Input() public grupos; // auxiliar para saber si hay grupos seleccionados

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();
  
  get f() {
    return this.registerFacultyForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public facultyService: FacultyService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService,  public dialogService: DialogService) { 

              this.spinner.show();  
  }

  ngOnInit(): void {
    //listas
    this.getGrupos();
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedFacultyId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      } else {
        this.mode = 'UPDATE' ;
        this.getDocente(this.SelectedId);
    }
    this.registerFacultyForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      grupo: [null, [Validators.required]],

    });

  }

  //obtiene el docente indicado por id en el estado de UPDATE
  getDocente(id) {
    this.facultyService.getFacultyById(id).subscribe((res: any) => {
      this.registerFacultyForm.patchValue(res);
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //metodo para el control de envio de la información del formulario
  onSubmit() {
    this.submitted = true;
    if (this.registerFacultyForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.faculty = this.registerFacultyForm.value;
    this.faculty.curso = this.selectedCourseId;
    this.onCreateDocente();
  }

  //metodo para crear / actualizar el objeto docente
  onCreateDocente() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.facultyService.registerFaculty(this.faculty).subscribe((response: any) => {
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
      this.facultyService.updateFaculty(this.faculty, this.SelectedId).subscribe((response: any) => {
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
    this.registerFacultyForm.reset();
  }

  //listas
  //lista de grupos registrados en el sistema
  getGrupos(){
    this.spinner.show();
    this.facultyService.getDetailsByName('Grupos').subscribe((res: any) => {
      this.grupoList = res;
      //limitar los grupos que ya esten registrados
      for (let j = 0; j < this.grupos.length; j++) {
        res.forEach(data => {
          if(data.nombre === this.grupos[j].nombre){
            var i = this.grupoList.indexOf( data );
            this.grupoList.splice(i, 1);
          }
        });
      }
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  lookUpDocentes() {
    const cols = [
      { field: 'primerNombre', header: 'users.primer_nombre' , width: '15%'},
      { field: 'primerApellido', header: 'users.primer_apell' , width: '15%'},
      { field: 'segundoApellido', header: 'users.seg_apellido' , width: '15%'}
    ];
    this.ref = this.dialogService.open(DialogLookupComponent, {
        header: 'Seleccione un docente de la lista',
        width: '70%',
        baseZIndex: 100,
        contentStyle: {'max-height': '450px' },
        data: { service: '/api/list-users', cols}
    });

    this.ref.onClose.subscribe(item => {
      if (item) {
          this.setiInfoDocente(item);
      }
    });
  }

  setiInfoDocente(item) {
    this.docente = (item) ? `${item.primerNombre} ${item.primerApellido} ${item.segundoApellido}` : '' ;
    this.f.nombre.setValue(this.docente);
  }

}
