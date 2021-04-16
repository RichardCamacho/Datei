import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Publications } from './publications.model';
import { PublicationsService } from './publications.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  registerPublicationForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  publication: Publications;

  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCurriculumId; // id del tipo de referencia que viene del padre
  @Input() public selectedPublicationId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;
  
  //coautores
  coauthorsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "100%", "typeField": 'standard' }
  ];
  coauthorsList: any[];
  coauthorsTablePaginator = false;
  coauthorsTableRows = 10;
  selectedCoauthorsId;


  timeLocale:any;

  get f() {
    return this.registerPublicationForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public publicationService: PublicationsService,
              private toastr: ToastrService, @Inject(LOCALE_ID) locale: string, private modalService: NgbModal
              , private translate: TranslateService, private spinner: NgxSpinnerService) { 

              this.timeLocale = locale;
              this.spinner.show(); 
              }

  ngOnInit(): void {

    this.SelectedId = this.selectedPublicationId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getPublication(this.SelectedId);
    }
    this.registerPublicationForm = this.formBuilder.group({
      id: [],
      fechaPublicacion: [null, [Validators.required]],
      lugarPublicacion: ["", [Validators.required, Validators.maxLength(100)]],
      titulo: ["", [Validators.required, Validators.maxLength(100)]],
      hoja_vida: [null],
    });

  }

  getPublication(id) {
    this.publicationService.getPublicationById(id).subscribe((res: any) => {
      this.publication = res;
      res.fechaPublicacion = formatDate(res.fechaPublicacion, "yyyy-MM-dd", this.timeLocale);
      this.registerPublicationForm.patchValue(res);
      this.getCoauthors();
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit() {
    
    this.submitted = true;
    if (this.registerPublicationForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.publication = this.registerPublicationForm.value;
    this.publication.hoja_vida = this.selectedCurriculumId;
    this.onCreatePublication();
  }

  onCreatePublication() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.publicationService.registerPublication(this.publication).subscribe((res: any) => {
        this.publication = res;
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
      this.publicationService.updatePublication(this.publication, this.SelectedId).subscribe((res: any) => {
        this.publication = res;
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
    this.registerPublicationForm.reset();
  }

  //listas de co-autores
  getCoauthors(){
    this.spinner.show();
    this.publicationService.getCoauthors(this.publication.id).subscribe((res: any) => {
      this.coauthorsList = res;
      this.coauthorsTablePaginator = (res.length > this.coauthorsTableRows) ? true : false;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onNewCoauthor() {
    // Nuevo detalle
    this.mdStickUp.show();
    this.selectedCoauthorsId = null;
  }

  onSaveCoauthor() {
    this.mdStickUp.hide();
    this.getCoauthors();
  }

  onEditCoauthor(id) {
    // edicion de detalle
    this.mdStickUp.show();
    this.selectedCoauthorsId = id;
  }

  //borrar un registro de estudio
  onDeleteCoauthor(id) {
    this.spinner.show();
    this.publicationService.deleteCoauthor(id).subscribe((res: any) => {
      this.getCoauthors();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
      err => {
        this.spinner.show();
        this.toastr.error(`Error, ${err.error.message}`)
      });
  }

  confirmModal(confirmation: string, id) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
      this.onDeleteCoauthor(id);
    }, (reason) => {
      // console.log("pasado");
    });
  }

}
