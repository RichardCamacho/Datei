import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Course } from './courses.model';
import { CoursesService } from './courses.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  registerCourseForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  selectedCourseId; // registra el id seleccionado que viene en la URL.
  mode = ''; // identifica el modo de transaccion del componente: CREATE , UPDATE
  modalComponetActive = '';// manejo de la ventana modal
  course: Course;
  tipoCursoList: any[];//lista de tipos de curso
  docentesList: any[];//lista de docentes
  
  auxgrupos: any[];

  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};

  get f() {
    return this.registerCourseForm.controls;
  }

  selectedFacultyId; // Id del detalle seleccionado

  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;

  
  facultyColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "50%", "typeField": 'standard' },
    { "header": 'docente.grupo', "field": "grupo", "width": "50%", "typeField": 'standard' }
  ];
  selectedFacultyRow; // fila seleccionada
  facultyList: any[];
  facultyTablePaginator = false;
  facultyTableRows = 10;

  //prerequisitos y corequisitos
  prerequisitesColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' },
    { "header": 'main.tipo', "field": "tipo", "width": "90%", "typeField": 'standard' }
  ];
  prerequisitesList: any[];
  prerequisitesTablePaginator = false;
  prerequisitesTableRows = 10;
  selectedPrerequisiteId;

  //objetivos especificos
  specificObjectivesColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' }
  ];
  specificObjectivesList: any[];
  specificObjectivesTablePaginator = false;
  specificObjectivesTableRows = 10;
  selectedObjectiveId;

  //temas de curso
  topicsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' }
  ];
  topicsList: any[];
  topicsTablePaginator = false;
  topicsTableRows = 10;
  selectedTopicId;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private toastr: ToastrService, private courseService: CoursesService,
    private modalService: NgbModal, private translate: TranslateService,
    private spinner: NgxSpinnerService) { 

    this.spinner.show();
    
    this.activatedRoute.params.subscribe(params => {
      this.selectedCourseId = params.id; // argumento enviado en la ruta
      if (this.selectedCourseId === undefined || this.selectedCourseId == null) {
        this.mode = 'CREATE';
      } else {
        this.mode = 'UPDATE';
        this.getCourse(this.selectedCourseId);
        this.getDetalles();
      }
    });

  }

  ngOnInit(): void {
    //listas
    this.getTiposCurso();

    this.registerCourseForm = this.formBuilder.group({
      id: [],
      codigo: ["", [Validators.required, Validators.maxLength(100)]],
      nombreEspaniol: ["", [Validators.required, Validators.maxLength(100)]],
      nombreIngles: ["", [Validators.required, Validators.maxLength(100)]],
      numeroCreditos: ["", [Validators.required, Validators.maxLength(100)]],
      horasSemestre: ["", [Validators.required, Validators.maxLength(100)]],
      // instructor: [null, [Validators.required]],
      tipoCurso: [null, [Validators.required]],
      informacion: ["", [Validators.required, Validators.maxLength(200)]],
      idUsuario:[null]
    });

  }

  //obtiene un registro de curso especificado por su ID
  getCourse(id) {
    this.courseService.getCourseById(id).subscribe((res: any) => {
      this.course = res;
      this.registerCourseForm.patchValue(this.course);
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getDetalles(){
    this.getDocentes();
    this.getPrerequisites();
    this.getObjectives();
    this.getTopics();
  }

  //metodo para el control de envio de la información del formulario
  onSubmit(){
    this.submitted = true;
    if (this.registerCourseForm.invalid) {
      return;
    }
    this.submittedUp = true;
    
    this.course = this.registerCourseForm.value;
    this.onRegisterCourse();
  }

  onRegisterCourse(){
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.courseService.registerCourse(this.course).subscribe( (res: any) => {
        this.course = res;
        this.spinner.hide();
        this.translate.get('success_create_update').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.mode = 'UPDATE';
        this.onSaveCourse(this.course.id);
      },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
        this.submittedUp = false;
      },
      () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.courseService.updateCourse(this.course, this.course.id).subscribe((res: any) => {
          this.course = res;
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
  onSaveCourse(id) {
    this.router.navigate([`./app/courses/${id}`]);
  }

  // acciones para el botón cancelar
  onCancel(){
    this.submitted = false;
    this.registerCourseForm.reset();
    if (this.mode === 'UPDATE') {
      this.getCourse(this.selectedCourseId);
    }
  }

  //listas
  getTiposCurso(){
    this.spinner.show();
    this.courseService.getDetailsByName('Tipo de Curso').subscribe((res: any) => {
      this.tipoCursoList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }
  
  getDocentes(){
    this.spinner.show();
    this.courseService.getFaculty(this.selectedCourseId).subscribe((res: any) => {
      this.facultyList = res.map((data) => ({
        id: data.id,
        nombre: data.nombre,
        grupo: data.grupo.nombre
      }));

      this.auxgrupos = res.map((data) => ({
        nombre: data.grupo.nombre
      }));

      this.facultyTablePaginator = (res.length > this.facultyTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }

  //agregar un docente
  onNewFaculty() {
    this.mdStickUp.show();
    this.modalComponetActive = 'faculties';
    this.selectedFacultyId = null;
  }

  //guardar docente
  onSaveFaculty() {
    this.mdStickUp.hide();
    this.getDocentes();
  }

  //editar un docente
  onEditFaculty(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'faculties';
    this.selectedFacultyId = id;
  }

  //borrar un docente
  onDeleteFaculty(id) {
    this.spinner.show();
    this.courseService.deleteFaculty(id).subscribe((res: any) => {
      this.getDocentes();
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
    this.courseService.getPrerequisites(this.selectedCourseId).subscribe((res: any) => {
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

  //agregando un nuevo detalle
  onNewPrerequisite() {
    this.mdStickUp.show();
    this.modalComponetActive = 'prerequisites';
    this.selectedPrerequisiteId = null;
  }

  //guardado del detalle
  onSavePrerequisite() {
    this.mdStickUp.hide();
    this.getPrerequisites();
  }

  // edicion de detalle
  onEditPrerequisite(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'prerequisites';
    this.selectedPrerequisiteId = id;
  }

  //borrar un registro de prerequisitos
  onDeletePrerequisite(id) {
    this.spinner.show();
    this.courseService.deletePrerequisite(id).subscribe((res: any) => {
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
    this.courseService.getObjectives(this.selectedCourseId).subscribe((res: any) => {
      this.specificObjectivesList = res;
      this.specificObjectivesTablePaginator = (res.length > this.specificObjectivesTableRows) ? true : false;
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //agregando un nuevo detalle
  onNewObjective() {
    this.mdStickUp.show();
    this.modalComponetActive = 'objectives';
    this.selectedObjectiveId = null;
  }

  //guardado del detalle
  onSaveObjective() {
    this.mdStickUp.hide();
    this.getObjectives();
  }

  // edicion de detalle
  onEditObjective(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'objectives';
    this.selectedObjectiveId = id;
  }

  //borrar un registro de objetivo
  onDeleteObjective(id) {
    this.spinner.show();
    this.courseService.deleteObjective(id).subscribe((res: any) => {
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

  //Temas de Curso-------------------------------------------------------------------------------------------------------
  getTopics(){
    this.courseService.getTopics(this.selectedCourseId).subscribe((res: any) => {
      this.topicsList = res;
      this.topicsTablePaginator = (res.length > this.topicsTableRows) ? true : false;
      //spinner
    },
    err => {
      //spinner
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //agregando un nuevo detalle
  onNewTopic() {
    this.mdStickUp.show();
    this.modalComponetActive = 'topics';
    this.selectedTopicId = null;
  }

  //guardado del detalle
  onSaveTopic() {
    this.mdStickUp.hide();
    this.getTopics();
  }

  // edicion de detalle
  onEditTopic(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'topics';
    this.selectedTopicId = id;
  }

  //borrar un registro de objetivo
  onDeleteTopic(id) {
    this.spinner.show();
    this.courseService.deleteTopic(id).subscribe((res: any) => {
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

  //confirmacion del modal de eliminacion
  confirmModal(confirmation: string, id, componentActive) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			switch (componentActive) {
        case 'faculties':
          this.onDeleteFaculty(id);
          break;
        case 'prerequisites':
          this.onDeletePrerequisite(id);
          break;
        case 'objectives':
          this.onDeleteObjective(id);
          break;
        case 'topics':
          this.onDeleteTopic(id);
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
