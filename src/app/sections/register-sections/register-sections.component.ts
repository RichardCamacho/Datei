import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Section } from '../sections/sections.model';
import { SectionsService } from '../sections/sections.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register-sections',
  templateUrl: './register-sections.component.html',
  styleUrls: ['./register-sections.component.css']
})
export class RegisterSectionsComponent implements OnInit {

  registerSectionForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  section: Section;

  @Input() public selectedSubjectFolderId; // id del tipo de referencia que viene del padre
  @Input() public selectedSectionId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerSectionForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public sectionService: SectionsService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) {
                
              this.spinner.show();
              }

  ngOnInit(): void {

    this.SelectedId = this.selectedSectionId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getSection(this.SelectedId);
    }
    this.registerSectionForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      idCarpeta: [null]
    });

  }

  getSection(id) {
    this.sectionService.getSectionById(id).subscribe((res: any) => {
      this.registerSectionForm.patchValue(res);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerSectionForm.invalid) {
      console.log('aqui')
      return;
    }
    this.submittedUp = true;
    this.section = this.registerSectionForm.value;
    this.section.idCarpeta = this.selectedSubjectFolderId;
    console.log(this.section);
    this.onCreateSection();
  }

  onCreateSection() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.sectionService.registerSection(this.section).subscribe((response: any) => {
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
      this.sectionService.updateSection(this.section, this.SelectedId).subscribe((response: any) => {
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
    this.registerSectionForm.reset();
  }
}