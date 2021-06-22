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
import { DateHelp } from 'src/app/_helpers/date-helper';

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
  maxDate: Date;
  yearRange: any;

  publication: Publications;// objeto publicacion con el que trabaja el componente

  //parametros de translate
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @Input() public selectedCurriculumId; // id de la hoja de vida con la que se trabaja
  @Input() public selectedPublicationId; // id de la publicacion seleccionada

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

  timeLocale:any;//hora local

  get f() {
    return this.registerPublicationForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public publicationService: PublicationsService,
              private toastr: ToastrService, @Inject(LOCALE_ID) locale: string, private modalService: NgbModal
              , private translate: TranslateService, private spinner: NgxSpinnerService, private dateHelp: DateHelp) { 

              this.timeLocale = locale;
              this.spinner.show(); 
              }

  ngOnInit(): void {
    this.maxDate = this.dateHelp.maxDateToday;
    this.yearRange = `1950:${this.dateHelp.year}`;

    //inicializando el componente en modo de creacion o actualizacion
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

  //obtiene la publicacion indicada por id en el estado de UPDATE
  getPublication(id) {
    this.publicationService.getPublicationById(id).subscribe((res: any) => {
      this.publication = res;
      res.fechaPublicacion = new Date(res.fechaPublicacion);
      this.registerPublicationForm.patchValue(res);
      this.getCoauthors();
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
    if (this.registerPublicationForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.publication = this.registerPublicationForm.value;
    this.publication.hoja_vida = this.selectedCurriculumId;
    this.onCreatePublication();
  }

  //metodo para crear / actualizar el objeto publicacion
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

  //cancelar la operacion llevada en el formulario.
  onCancel() {
    this.onEventCancel.emit(true);
    this.cleanForm();
  }

  //limpia el formulario
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

  //nuevo coautor
  onNewCoauthor() {
    this.mdStickUp.show();
    this.selectedCoauthorsId = null;
  }

  //guardar coautor
  onSaveCoauthor() {
    this.mdStickUp.hide();
    this.getCoauthors();
  }

  //edicion de detalle
  onEditCoauthor(id) {
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
}
