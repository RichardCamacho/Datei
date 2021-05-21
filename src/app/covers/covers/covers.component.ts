import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Covers } from './covers.model';
import { CoversService } from './covers.service';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.css']
})
export class CoversComponent implements OnInit {

  registerCoverForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  cover: Covers;// objeto cover/portada con el que trabaja el componente

  @Input() public selectedSubjectId; // id del tipo de referencia que viene del padre
  @Input() public selectedCoverId; // id la referencia seleccionada que viene del padre

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerCoverForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public coverService: CoversService,
              private toastr: ToastrService, private translate: TranslateService) {
              }

  ngOnInit(): void {
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedCoverId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      } else {
        this.mode = 'UPDATE' ;
    }
    this.registerCoverForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      curso: [null],
      filename: [null, [Validators.required]]
    });

  }

  //metodo para el control de envio de la información del formulario
  onSubmit() {
    this.submitted = true;
    if (this.registerCoverForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.cover = this.registerCoverForm.value;
    this.cover.curso = this.selectedSubjectId;
    // this.onCreateCover();
  }

  onCreateCover() {
    if (this.mode === 'CREATE') {
      this.coverService.registerCover(this.cover).subscribe((response: any) => {
           this.translate.get('success_create_update').subscribe((res: string) => {
            this.toastr.success(res);
          });
          this.onEventSave.emit(true);
          this.cleanForm();
          this.submittedUp = false;
        },
        err => {
          this.toastr.error(`Error, ${err.error.message}`);
          this.submittedUp = false;
        },
        () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.coverService.updateCover(this.cover, this.SelectedId).subscribe((response: any) => {
           this.translate.get('success_create_update').subscribe((res: string) => {
            this.toastr.success(res);
          });
          this.onEventSave.emit(true);
          this.cleanForm();
          this.submittedUp = false;
        },
        err => {
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
    this.registerCoverForm.reset();
  }

}
