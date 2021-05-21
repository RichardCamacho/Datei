import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { StudentOutcomes } from './student-outcomes.model';
import { StudentOutcomesService } from './student-outcomes.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-student-outcomes',
  templateUrl: './student-outcomes.component.html',
  styleUrls: ['./student-outcomes.component.css']
})
export class StudentOutcomesComponent implements OnInit {

  registerStudentOutcomeForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  studentOutcome: StudentOutcomes;// objeto student outcome con el que trabaja el componente

  //parametros de translate
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};

  @Input() public selectedSubjectId; // id del curso o asigantura con la que se está trabajando
  @Input() public selectedStudentOutcomeId; // id del SO seleccionado

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerStudentOutcomeForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public studentOutcomesService: StudentOutcomesService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) {

              this.spinner.show();
              }

  ngOnInit(): void {
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedStudentOutcomeId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getStudentOutcome(this.SelectedId);
    }
    this.registerStudentOutcomeForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      descripcion: ["", [Validators.required, Validators.maxLength(200)]],
      curso: [null]
    });

  }

  //obtiene el SO indicado por id en el estado de UPDATE
  getStudentOutcome(id) {
    this.studentOutcomesService.getStudentOutcomeById(id).subscribe((res: any) => {
      this.registerStudentOutcomeForm.patchValue(res);
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
    if (this.registerStudentOutcomeForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.studentOutcome = this.registerStudentOutcomeForm.value;
    this.studentOutcome.curso = this.selectedSubjectId;
    this.onCreateStudentOutcome();
  }
  //metodo para crear / actualizar el objeto SO
  onCreateStudentOutcome() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.studentOutcomesService.registerStudentOutcome(this.studentOutcome).subscribe((response: any) => {
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
      this.studentOutcomesService.updateStudentOutcome(this.studentOutcome, this.SelectedId).subscribe((response: any) => {
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
    this.registerStudentOutcomeForm.reset();
  }

}

