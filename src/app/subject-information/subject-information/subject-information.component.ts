import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogLookupComponent } from 'src/app/dialog-lookup/dialog-lookup.component';
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
  idUsuario;
  modalComponetActive = '';

  portada: any;
  cover: any = '';
  
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};


  //gestion de lista de cursos
  cursosList: any[] = [];//lista de cursos
  photosBuffer = [];
  bufferSize = 5;
  numberOfItemsFromEndBeforeFetchingMore = 5;
  loading = false;

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

  //prerequisitos y corequisitos  (mapear)
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

    this.idUsuario = parseInt(sessionStorage.getItem('user'));//rescato el id que está almacenado en la sesión

    if(this.mode === 'CREATE'){
      this.f.auxCurso.setValidators([Validators.required]);
    }else{
      this.f.auxCurso.setValidators(null);
    }

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

  getDetails(){
    this.spinner.show();
    this.getDocentes();
    this.getCover();
    this.getBooks();
    this.getPrerequisites();
    this.getObjectives();
    this.getStudentOutcomes();
    this.getTopics();
    this.spinner.hide();
  }

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
  getTiposCurso(){
    this.subjectInformationService.getDetailsByName('Tipo de Curso').subscribe((res: any) => {
      this.tipoCursoList = res;
      //spinner
    },
    err => {
      //spinner
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getCursos(){
    this.subjectInformationService.getCourses().subscribe((res: any) => {
      this.cursosList = res;
      this.photosBuffer = this.cursosList.slice(0, this.bufferSize);
      //spinner
    },
    err => {
      //spinner
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.cursosList.length <= this.photosBuffer.length) {
        return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
        this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.photosBuffer.length;
    const more = this.cursosList.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
        this.loading = false;
        this.photosBuffer = this.photosBuffer.concat(more);
    }, 200)
  }

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
      this.getDocentes();
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

  getDocentes(){
    this.spinner.show();
    this.subjectInformationService.getFaculty(this.subject.idCurso).subscribe((res: any) => {
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

  onNewBook() {
    this.mdStickUp.show();
    this.modalComponetActive = 'books';
    this.selectedBookId = null;
  }

  onSaveBook() {
    //spinner
    this.mdStickUp.hide();
    this.getBooks();
  }

  onEditBook(id) {
    // edicion de detalle
    this.mdStickUp.show();
    this.modalComponetActive = 'books';
    this.selectedBookId = id;
  }

  //borrar un registro de libro
  onDeleteBook(id) {
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

  // //Prerequisitos y corequisitos-------------------------------------------------------------------------------------------------------
  getPrerequisites(){
    this.subjectInformationService.getPrerequisites(this.subject.id).subscribe((res: any) => {
      this.prerequisitesList = res.map((data) => ({
        id: data.id,
        nombre: data.nombre,
        tipo: data.tipo.nombre
      }));
      this.prerequisitesTablePaginator = (res.length > this.prerequisitesTableRows) ? true : false;
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onNewPrerequisite() {
    this.mdStickUp.show();
    this.modalComponetActive = 'prerequisites';
    this.selectedPrerequisiteId = null;
  }

  onSavePrerequisite() {
    //spinner
    this.mdStickUp.hide();
    this.getPrerequisites();
  }

  onEditPrerequisite(id) {
    // edicion de detalle
    this.mdStickUp.show();
    this.modalComponetActive = 'prerequisites';
    this.selectedPrerequisiteId = id;
  }

  //borrar un registro de prerequisitos
  onDeletePrerequisite(id) {
    this.subjectInformationService.deletePrerequisite(id).subscribe((res: any) => {
      this.getPrerequisites();
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

  // //Objetivos-------------------------------------------------------------------------------------------------------
  getObjectives(){
    this.subjectInformationService.getObjectives(this.subject.id).subscribe((res: any) => {
      this.specificObjectivesList = res;
      this.specificObjectivesTablePaginator = (res.length > this.specificObjectivesTableRows) ? true : false;
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onNewObjective() {
    this.mdStickUp.show();
    this.modalComponetActive = 'objectives';
    this.selectedObjectiveId = null;
  }

  onSaveObjective() {
    //spinner
    this.mdStickUp.hide();
    this.getObjectives();
  }

  onEditObjective(id) {
    // edicion de detalle
    this.mdStickUp.show();
    this.modalComponetActive = 'objectives';
    this.selectedObjectiveId = id;
  }

  //borrar un registro de objetivo
  onDeleteObjective(id) {
    this.subjectInformationService.deleteObjective(id).subscribe((res: any) => {
      this.getObjectives();
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

  onNewStudentOutcome() {
    this.mdStickUp.show();
    this.modalComponetActive = 'studentOutcomes';
    this.selectedStudentOutcomeId = null;
  }

  onSaveStudentOutcome() {
    //spinner
    this.mdStickUp.hide();
    this.getStudentOutcomes();
  }

  onEditStudentOutcome(id) {
    // edicion de detalle
    this.mdStickUp.show();
    this.modalComponetActive = 'studentOutcomes';
    this.selectedStudentOutcomeId = id;
  }

  //borrar un registro de objetivo
  onDeleteStudentOutcome(id) {
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

  // //Temas de Curso-------------------------------------------------------------------------------------------------------
  getTopics(){
    this.subjectInformationService.getTopics(this.subject.id).subscribe((res: any) => {
      this.topicsList = res;
      this.topicsTablePaginator = (res.length > this.topicsTableRows) ? true : false;
      //spinner
    },
    err => {
      //spinner
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onNewTopic() {
    this.mdStickUp.show();
    this.modalComponetActive = 'topics';
    this.selectedTopicId = null;
  }

  onSaveTopic() {
    //spinner
    this.mdStickUp.hide();
    this.getTopics();
  }

  onEditTopic(id) {
    // edicion de detalle
    this.mdStickUp.show();
    this.modalComponetActive = 'topics';
    this.selectedTopicId = id;
  }

  //borrar un registro de objetivo
  onDeleteTopic(id) {
    this.subjectInformationService.deleteTopic(id).subscribe((res: any) => {
      this.getTopics();
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

  getCover(){//recupera los datos de la imagen del repositorio
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

  setCover(){//guarda en la propiedad filename
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

  onNewCover() {
    this.mdStickUp.show();
    this.modalComponetActive = 'cover';
  }

  onSaveCover() {
    this.mdStickUp.hide();
    this.setCover();
  }

  //borrar un registro de objetivo
  onDeleteCover() {
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

  confirmModal(confirmation: string, id, componentActive) {
    this.spinner.show();
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			switch (componentActive) {
        case 'books':
          this.onDeleteBook(id);
          break;
        case 'prerequisites':
          this.onDeletePrerequisite(id);
          break;
        case 'objectives':
          this.onDeleteObjective(id);
          break;
        case 'studentOutcomes':
          this.onDeleteStudentOutcome(id);
          break;
        case 'topics':
          this.onDeleteTopic(id);
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
