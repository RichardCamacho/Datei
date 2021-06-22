import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubjectInformation } from './subject-information.model';
import { SubjectInformationService } from './subject-information.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-subject-information',
  templateUrl: './subject-information.component.html',
  styleUrls: ['./subject-information.component.css'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class SubjectInformationComponent implements OnInit {

  registerSubjectInformationForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  selectedSubjectId; // registra el id seleccionado que viene en la URL.
  mode = ''; // identifica el modo de transaccion del componente: CREATE , UPDATE
  ref: DynamicDialogRef;
  subject: SubjectInformation;

  tipoCursoList: any[];//lista de tipos de curso
  idUsuario; //id de usuario para saber a que usuario asignar la carpeta o consultarla
  modalComponetActive = '';// manejo de la ventana modal

  // portada: any; 
  cover: any = '';// variable de portada
  
  //parametros de translate
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};

  //gestion de lista de cursos
  cursosList: any[] = [];//lista de cursos
  coursesBuffer = [];//lista de cursos
  bufferSize = 5;//tope de la lista que se muestra
  numberOfItemsFromEndBeforeFetchingMore = 5;
  loading = false;//carga de la lista

  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;
  
  get f() {
    return this.registerSubjectInformationForm.controls;
  }

  //textos guia
  booksColumns: any[] = [
    { "header": 'main.titulo', "field": "titulo", "width": "30%", "typeField": 'standard' },
    { "header": 'main.autor', "field": "autor", "width": "30%", "typeField": 'standard' },
    { "header": 'main.editorial', "field": "editorial", "width": "30%", "typeField": 'standard' },
    { "header": 'main.anio', "field": "anio", "width": "10%", "typeField": 'standard' }
  ];
  booksList: any[];
  booksTablePaginator = false;
  booksTableRows = 10;
  selectedBookId; // fila seleccionada

  //prerequisitos y corequisitos
  prerequisitesColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' },
    { "header": 'main.tipo', "field": "tipo", "width": "90%", "typeField": 'standard' }
  ];
  prerequisitesList: any[];
  prerequisitesTablePaginator = false;
  prerequisitesTableRows = 10;
  selectedPrerequisiteId; // fila seleccionada

  //objetivos especificos
  specificObjectivesColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' }
  ];
  specificObjectivesList: any[];
  specificObjectivesTablePaginator = false;
  specificObjectivesTableRows = 10;
  selectedObjectiveId; // fila seleccionada

  //student outcome
  studentOutcomesColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "20%", "typeField": 'standard' },
    { "header": 'main.descripcion', "field": "descripcion", "width": "80%", "typeField": 'standard' }
  ];
  studentOutcomesList: any[];
  studentOutcomesTablePaginator = false;
  studentOutcomesTableRows = 10;
  selectedStudentOutcomeId; // fila seleccionada

  //temas de curso
  topicsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' }
  ];
  topicsList: any[];
  topicsTablePaginator = false;
  topicsTableRows = 10;
  selectedTopicId; // fila seleccionada
  selectedCoverId;

  //docentes
  facultyColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "50%", "typeField": 'standard' },
    { "header": 'docente.grupo', "field": "grupo", "width": "50%", "typeField": 'standard' }
  ];
  selectedFacultyRow; // fila seleccionada
  facultyList: any[];
  facultyTablePaginator = false;
  facultyTableRows = 10;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService, private subjectInformationService: SubjectInformationService,
              private modalService: NgbModal, private translate: TranslateService,  public dialogService: DialogService,
              private spinner: NgxSpinnerService, private sanitizer: DomSanitizer) { 

              this.spinner.show();
              //inicializando el componente en modo de creacion o actualizacion
              this.activatedRoute.params.subscribe(params => {
                this.selectedSubjectId = params.id; // argumento enviado en la ruta
                if (this.selectedSubjectId === undefined || this.selectedSubjectId == null) {
                  this.mode = 'CREATE';
                  this.cover = "../../../assets/images/default.jpg";
                  this.spinner.hide();
                } else {
                  this.mode = 'UPDATE';
                  this.getSubject(this.selectedSubjectId);
                }
              });

  }

  ngOnInit(): void {

    //listas
    this.getTiposCurso();
    this.getCursos();

    this.registerSubjectInformationForm = this.formBuilder.group({
      id: [],
      codigo: ["", [Validators.required, Validators.maxLength(100)]],
      nombreEspaniol: ["", [Validators.required, Validators.maxLength(100)]],
      nombreIngles: ["", [Validators.required, Validators.maxLength(100)]],
      numeroCreditos: ["", [Validators.required, Validators.maxLength(100)]],
      horasSemestre: ["", [Validators.required, Validators.maxLength(100)]],
      tipoCurso: [null, [Validators.required]],
      informacion: ["", [Validators.required, Validators.maxLength(200)]],
      //portada
      titulo: ["", [Validators.maxLength(200)]],
      autor: ["", [Validators.maxLength(200)]],
      editorial: ["", [Validators.maxLength(100)]],
      anio: ["", [Validators.maxLength(20)]],
      filename: [null],
      idUsuario:[null],
      idCurso:[null],
      //auxiliar
      auxCurso: [null],
    });

    //rescatando el id de usuario almacenado localmente en la sesion
    this.idUsuario = parseInt(sessionStorage.getItem('user'));//rescato el id que está almacenado en la sesión

    if(this.mode === 'CREATE'){
      this.f.auxCurso.setValidators([Validators.required]);
    }else{
      this.f.auxCurso.setValidators(null);
    }

    //imagen de portada por defecto
    this.f.filename.valueChanges.subscribe(res => {
      this.cover = (res)? res.filename:"../../../assets/images/default.jpg";
    });

    this.f.auxCurso.valueChanges.subscribe(res => {
      this.setValues(res)
    });

  }

  //obtiene un registro de curso especificado por su ID
  getSubject(id) {
    this.subjectInformationService.getSubjectDetailsById(id).subscribe((res: any) => {
      this.subject = res;
      this.registerSubjectInformationForm.patchValue(this.subject);
      this.getDetails();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //llama metodos para obtener todos los detalles del curso
  getDetails(){
    this.spinner.show();
    this.getDocentes(this.subject.idCurso);
    this.getPrerequisitos(this.subject.idCurso);
    this.getObjetivos(this.subject.idCurso);
    this.getTemas(this.subject.idCurso);
    this.getCover();
    this.getBooks();
    this.getStudentOutcomes();
    this.spinner.hide();
  }

  //metodo para el control de envio de la información del formulario
  onSubmit(){
    this.submitted = true;
    if (this.registerSubjectInformationForm.invalid) {
      return;
    }
    this.submittedUp = true;
    
    this.subject = this.registerSubjectInformationForm.value;
    this.subject.idUsuario =  this.idUsuario;
    this.onRegisterSubject();
  }

  //metodo para crear / actualizar el objeto de Curso
  onRegisterSubject(){
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.subjectInformationService.registerSubject(this.subject).subscribe( (res: any) => {
        this.subject = res;
        this.spinner.hide();
        this.translate.get('success_create_update').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.mode = 'UPDATE';
        this.onSaveSubject(this.subject.id);
      },
      err => {
        this.toastr.error(`Error, ${err.error.message}`);
        this.submittedUp = false;
      },
      () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.subjectInformationService.updateSubject(this.subject, this.subject.id).subscribe((res: any) => {
          this.subject = res;
          this.spinner.hide();
          this.translate.get('success_create_update').subscribe((res: string) => {
            this.toastr.success(res);
          });
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

  //redireccionar al estado de edición
  onSaveSubject(id) {
    this.router.navigate([`./app/subject-information/${id}`]);
  }

  // acciones para el botón cancelar
  onCancel(){
    this.submitted = false;
    this.registerSubjectInformationForm.reset();
    if (this.mode === 'UPDATE') {
      this.getSubject(this.selectedSubjectId);
    }
  }

  //listas
  //tipos de curso
  getTiposCurso(){
    this.subjectInformationService.getDetailsByName('Tipo de Curso').subscribe((res: any) => {
      this.tipoCursoList = res;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }
  //lista de cursos que estan disponibles en el sistema
  getCursos(){
    this.subjectInformationService.getCourses().subscribe((res: any) => {
      this.cursosList = res;
      this.coursesBuffer = this.cursosList.slice(0, this.bufferSize);
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }
  //scroll de la lista
  onScrollToEnd() {
    this.fetchMore();
  }
  //scroll de la lista
  onScroll({ end }) {
    if (this.loading || this.cursosList.length <= this.coursesBuffer.length) {
        return;
    }
    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.coursesBuffer.length) {
        this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.coursesBuffer.length;
    const more = this.cursosList.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
        this.loading = false;
        this.coursesBuffer = this.coursesBuffer.concat(more);
    }, 200)
  }

  //ajuste de valores a los campos del formulario
  setValues(data){
    if(data){
      this.f.idCurso.setValue(data.id);
      this.f.codigo.setValue(data.codigo);
      this.f.nombreEspaniol.setValue(data.nombreEspaniol);
      this.f.nombreIngles.setValue(data.nombreIngles);
      this.f.numeroCreditos.setValue(data.numeroCreditos);
      this.f.horasSemestre.setValue(data.horasSemestre);
      this.f.tipoCurso.setValue(data.tipo_curso);
      this.f.informacion.setValue(data.informacion);
      this.getDocentes(data.id);
      this.getPrerequisitos(data.id);
      this.getObjetivos(data.id);
      this.getTemas(data.id);
    }else{
      this.f.codigo.setValue('');
      this.f.nombreEspaniol.setValue('');
      this.f.nombreIngles.setValue('');
      this.f.numeroCreditos.setValue('');
      this.f.horasSemestre.setValue('');
      this.f.tipoCurso.setValue(null);
      this.f.informacion.setValue('');
    }
  }

  //obteniendo la lista de docentes del curso seleccionado
  getDocentes(id){
    this.spinner.show();
    this.subjectInformationService.getFaculty(id).subscribe((res: any) => {
      this.facultyList = res.map((data) => ({
        id: data.id,
        nombre: data.nombre,
        grupo: data.grupo.nombre
      }));
      this.facultyTablePaginator = (res.length > this.facultyTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }

  //obteniendo la lista de prerequisitos del curso seleccionado
  getPrerequisitos(id){
    this.spinner.show();
    this.subjectInformationService.getPrerequisites(id).subscribe((res: any) => {
      this.prerequisitesList = res.map((data) => ({
        id: data.id,
        nombre: data.nombre,
        tipo: data.tipo.nombre
      }));
      this.prerequisitesTablePaginator = (res.length > this.prerequisitesTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }

  //obteniendo la lista de objetivos del curso seleccionado
  getObjetivos(id){
    this.spinner.show();
    this.subjectInformationService.getObjectives(id).subscribe((res: any) => {
      this.specificObjectivesList = res;
      this.specificObjectivesTablePaginator = (res.length > this.specificObjectivesTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }
  
  //obteniendo la lista de temas del curso seleccionado
  getTemas(id){
    this.spinner.show();
    this.subjectInformationService.getTopics(id).subscribe((res: any) => {
      this.topicsList = res;
      this.topicsTablePaginator = (res.length > this.topicsTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }
  
  //listas de detalles de curso
  //Libros y textos-------------------------------------------------------------------------------------------------------
  getBooks(){
    this.subjectInformationService.getBooks(this.subject.id).subscribe((res: any) => {
      this.booksList = res;
      this.booksTablePaginator = (res.length > this.booksTableRows) ? true : false;
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //agregando un nuevo detalle
  onNewBook() {
    this.mdStickUp.show();
    this.modalComponetActive = 'books';
    this.selectedBookId = null;
  }

  //guardado del detalle
  onSaveBook() {
    this.mdStickUp.hide();
    this.getBooks();
  }

  //edicion de detalle
  onEditBook(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'books';
    this.selectedBookId = id;
  }

  //borrar un registro de libro
  onDeleteBook(id) {
    this.spinner.show();
    this.subjectInformationService.deleteBook(id).subscribe((res: any) => {
      this.getBooks();
      this.spinner.hide();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  // //Student Outcomes-------------------------------------------------------------------------------------------------------
  getStudentOutcomes(){
    this.subjectInformationService.getStudentOutcomes(this.subject.id).subscribe((res: any) => {
      this.studentOutcomesList = res;
      this.studentOutcomesTablePaginator = (res.length > this.studentOutcomesTableRows) ? true : false;
      //spinner
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //agregando un nuevo detalle
  onNewStudentOutcome() {
    this.mdStickUp.show();
    this.modalComponetActive = 'studentOutcomes';
    this.selectedStudentOutcomeId = null;
  }

  //guardado del detalle
  onSaveStudentOutcome() {
    this.mdStickUp.hide();
    this.getStudentOutcomes();
  }

  // edicion de detalle
  onEditStudentOutcome(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'studentOutcomes';
    this.selectedStudentOutcomeId = id;
  }

  //borrar un registro de objetivo
  onDeleteStudentOutcome(id) {
    this.spinner.show();
    this.subjectInformationService.deleteStudentOutcome(id).subscribe((res: any) => {
      this.getStudentOutcomes();
      this.spinner.hide();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  
  //Portada-------------------------------------------------------------------------------------------------------
  transformBase64(blob){//procesa el blob para convertirlo en una imagen para mostrar
    var reader = new FileReader();
    var base64data
    var fn = this;
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
      base64data = reader.result;
      fn.cover = base64data;
      fn.spinner.hide();
    }
  }

  //recupera los datos de la imagen del repositorio
  getCover(){
    this.spinner.show();
    if(!this.f.filename.value){//si no hay portada
      this.cover = "../../../assets/images/default.jpg";//setea la imagen por defecto
    }else{//hay portada
      this.subjectInformationService.getCover(this.subject.id).subscribe((res: any) => {//busca el registro de la imagen de portada
        this.transformBase64(res);
      },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
    }
  }

  //guarda en la propiedad filename
  setCover(){
    this.subjectInformationService.getCoverInfo(this.subject.id).subscribe((res: any) => {
      this.f.filename.setValue(res.nombre);
      this.getCover();
      this.onSubmit();//Guardar
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //registro de nueva portada
  onNewCover() {
    this.mdStickUp.show();
    this.modalComponetActive = 'cover';
  }

  //guardado de portada
  onSaveCover() {
    this.mdStickUp.hide();
    this.setCover();
  }

  //borrar un registro de objetivo
  onDeleteCover() {
    this.spinner.show();
    this.subjectInformationService.deleteCover(this.subject.id).subscribe((res: any) => {
      this.spinner.hide();
      this.f.filename.setValue(null);
      this.getCover();
      this.onSubmit();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  //obtiene la url del servicio
  getUrlFileUpload() {
    return this.subjectInformationService.getUrlFileUpload();
  }

  //confirmacion del modal de eliminacion
  confirmModal(confirmation: string, id, componentActive) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			switch (componentActive) {
        case 'books':
          this.onDeleteBook(id);
          break;
        case 'studentOutcomes':
          this.onDeleteStudentOutcome(id);
          break;
        case 'cover':
            this.onDeleteCover();
          break;
        default:
          break;
      }
		}, (reason) => {
			// console.log("pasado");
		});
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
