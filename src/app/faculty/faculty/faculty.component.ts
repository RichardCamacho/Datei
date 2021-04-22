import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Docente } from './faculty.model';
import { FacultyService } from './faculty.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  registerFacultyForm: FormGroup;
  submitted = false;
  submittedUp = false;

  faculty: Docente;

  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  grupoList: any[];//lista de tipos de curso
  
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCourseId; // id del tipo de referencia que viene del padre
  @Input() public selectedFacultyId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();
  
  get f() {
    return this.registerFacultyForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public facultyService: FacultyService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 

              this.spinner.show();  
  }

  ngOnInit(): void {
    //listas
    this.getGrupos();

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

  getDocente(id) {
    this.facultyService.getFacultyById(id).subscribe((res: any) => {
      this.registerFacultyForm.patchValue(res);
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerFacultyForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.faculty = this.registerFacultyForm.value;
    this.faculty.curso = this.selectedCourseId;
    console.log(this.faculty)
    this.onCreateDocente();
  }

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

  onCancel() {
    this.onEventCancel.emit(true);
    this.cleanForm();
  }

  cleanForm(){
    this.submitted = false;
    this.registerFacultyForm.reset();
  }

  //listas
  getGrupos(){
    this.spinner.show();
    this.facultyService.getDetailsByName('Grupos').subscribe((res: any) => {
      console.log(res)
      this.grupoList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

}