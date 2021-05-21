import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from './books.model';
import { BooksService } from './books.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  registerBookForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  mode = '' ; // identifica el modo de transaccion del componente: CREATE , UPDATE
  SelectedId: number; // Id del registro seleccionado

  book: Book;// objeto libro con el que trabaja el componente

  //parametros de translate
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};

  @Input() public selectedSubjectId; // id de la asignatura con la que se está trabajando
  @Input() public selectedBookId; // id del libro seleccionado

  @Output() onEventSave = new EventEmitter<boolean>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  get f() {
    return this.registerBookForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, public booksService: BooksService,
              private toastr: ToastrService, private translate: TranslateService,
              private spinner: NgxSpinnerService) {

              this.spinner.show();
  }

  ngOnInit(): void {
    //inicializando el componente en modo de creacion o actualizacion
    this.SelectedId = this.selectedBookId ;
    if (this.SelectedId === undefined || this.SelectedId == null) {
      this.mode = 'CREATE';
      this.spinner.hide();
      } else {
        this.mode = 'UPDATE' ;
        this.getBook(this.SelectedId);
    }
    this.registerBookForm = this.formBuilder.group({
      id: [],
      titulo: ["", [Validators.required, Validators.maxLength(200)]],
      autor: ["", [Validators.required, Validators.maxLength(200)]],
      editorial: ["", [Validators.required, Validators.maxLength(100)]],
      anio: ["", [Validators.required, Validators.maxLength(20)]],
      curso: [null],
    });

  }

  //obtiene el libro indicado por id en el estado de UPDATE
  getBook(id) {
    this.booksService.getBookById(id).subscribe((res: any) => {
      this.registerBookForm.patchValue(res);
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
    if (this.registerBookForm.invalid) {
      return;
    }
    this.submittedUp = true;
    this.book = this.registerBookForm.value;
    this.book.curso = this.selectedSubjectId;
    this.onCreateBook();
  }

  //metodo para crear / actualizar el objeto libro
  onCreateBook() {
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.booksService.registerBook(this.book).subscribe((response: any) => {
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
      this.booksService.updateBook(this.book, this.SelectedId).subscribe((response: any) => {
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
    this.registerBookForm.reset();
  }

  //previene que en los campos se incluyan caracteres diferentes a los numericos
  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {    
      // invalida el caracter señalado y evita la entrada del mismo en el campo
      event.preventDefault();
    }
  }
}