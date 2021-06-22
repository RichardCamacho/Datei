import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SpecificObjectives } from './specific-objectives.model';
import { SpecificObjectivesService } from './specific-objectives.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-specific-objectives',
  templateUrl: './specific-objectives.component.html',
  styleUrls: ['./specific-objectives.component.css']
})
export class SpecificObjectivesComponent implements OnInit {

  registerObjectiveForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  objective: SpecificObjectives;// objeto objetivo especifico con el que trabaja el componente

  //parametros de translate
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCourseId; // id del curso o asignatura con el que se está trabajando
  @Input() public selectedObjectiveId; // id del objetivo selecciconado

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerObjectiveForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public objectivesService: SpecificObjectivesService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) {

              this.spinner.show();
              }

  ngOnInit(): void {
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedObjectiveId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getObjective(this.SelectedId);
    }
    this.registerObjectiveForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      curso: [null],
    });

  }

  //obtiene el objetivo indicado por id en el estado de UPDATE
  getObjective(id) {
    this.objectivesService.getObjectiveById(id).subscribe((res: any) => {
      this.registerObjectiveForm.patchValue(res);
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
    if (this.registerObjectiveForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.objective = this.registerObjectiveForm.value;
    this.objective.curso = this.selectedCourseId;
    this.onCreateObjective();
  }
  
  //metodo para crear / actualizar el objeto experiencia academica
  onCreateObjective() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.objectivesService.registerObjective(this.objective).subscribe((response: any) => {
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
      this.objectivesService.updateObjective(this.objective, this.SelectedId).subscribe((response: any) => {
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
    this.registerObjectiveForm.reset();
  }

}

