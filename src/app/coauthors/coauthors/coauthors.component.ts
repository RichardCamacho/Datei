import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Coauthor } from './coauthors.model';
import { CoauthorsService } from './coauthors.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-coauthors',
  templateUrl: './coauthors.component.html',
  styleUrls: ['./coauthors.component.css']
})
export class CoauthorsComponent implements OnInit {

  registerCoauthorForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  coauthor: Coauthor;

  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedPublicationId; // id publicacion
  @Input() public selectedCoauthorsId; // id coautor

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerCoauthorForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public coauthorService: CoauthorsService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 

              this.spinner.show();
  }

  ngOnInit(): void {
    this.SelectedId = this.selectedCoauthorsId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getCoauthor(this.SelectedId);
    }
    this.registerCoauthorForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      publicacion: [null],
    });
  }

  getCoauthor(id) {
    this.coauthorService.getCoauthorById(id).subscribe((res: any) => {
      this.coauthor = res;
      this.registerCoauthorForm.patchValue(res);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerCoauthorForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.coauthor = this.registerCoauthorForm.value;
    this.coauthor.publicacion = this.selectedPublicationId;
    this.onCreatePublication();
  }

  onCreatePublication() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.coauthorService.registerCoauthor(this.coauthor).subscribe((res: any) => {
        this.coauthor = res;
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
      this.coauthorService.updateCoauthor(this.coauthor, this.SelectedId).subscribe((res: any) => {
        this.coauthor = res;
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
    this.registerCoauthorForm.reset();
  }

}
