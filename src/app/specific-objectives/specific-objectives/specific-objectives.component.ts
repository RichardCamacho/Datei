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

  objective: SpecificObjectives;

  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedSubjectId; // id del tipo de referencia que viene del padre
  @Input() public selectedObjectiveId; // id la referencia seleccionada que viene del padre

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

    this.SelectedId = this.selectedObjectiveId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
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

  onSubmit() {
    this.submitted = true;
    if (this.registerObjectiveForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.objective = this.registerObjectiveForm.value;
    this.objective.curso = this.selectedSubjectId;
    this.onCreateObjective();
  }

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

  onCancel() {
    this.onEventCancel.emit(true);
    this.cleanForm();
  }

  cleanForm(){
    this.submitted = false;
    this.registerObjectiveForm.reset();
  }

}

