import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CurriculumVitae } from './curriculum-vitae.model';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-curriculum-vitae',
  templateUrl: './curriculum-vitae.component.html',
  styleUrls: ['./curriculum-vitae.component.css']
})
export class CurriculumVitaeComponent implements OnInit {

  registerCurriculumVitaeForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  selectedCurriculumId; // registra el id seleccionado que viene en la URL.
  mode = ''; // identifica el modo de transaccion del componente: CREATE , UPDATE

  fechaActaulizacion: string;
  user;//variable auxiliar para almacenar un usuario
  idUsuario;//id de usuario al cual se asocia la hoja de vida
  curriculum = new CurriculumVitae;//objeto hoja de vida
  
  RolesList: any[];//lista de roles
  RangosList: any[];//lista de rangos
  ProgramasList: any[];//lista de programas

  modalComponetActive = '';
  timeLocale:any;//tiempo local
  today:any;//hoy

  //parametros de translate
  param20 = {value: '20'};
  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;

  get f() {
    return this.registerCurriculumVitaeForm.controls;
  }

  //Experiencia Académica
  academicExperienceColumns: any[] = [
    { "header": 'main.iniciado_en', "field": "fechaInicio", "width": "15%", "typeField": 'date' },
    { "header": 'main.finalizado_en', "field": "fechaFinalizacion", "width": "15%", "typeField": 'date' },
    { "header": 'main.titulo', "field": "titulo", "width": "30%", "typeField": 'standard' },
    { "header": 'main.institucion', "field": "institucion", "width": "40%", "typeField": 'standard' }
  ];
  academicExperienceList: any[];
  academicExperienceTablePaginator = false;
  academicExperienceTableRows = 10;
  selectedAcademicExperienceId; // fila seleccionada

  //Experiencia no Académica
  noAcademicExperienceColumns: any[] = [
    { "header": 'main.iniciado_en', "field": "fechaInicio", "width": "15%", "typeField": 'date' },
    { "header": 'main.finalizado_en', "field": "fechaFinalizacion", "width": "15%", "typeField": 'date' },
    { "header": 'main.titulo', "field": "titulo", "width": "30%", "typeField": 'standard' },
    { "header": 'main.compania', "field": "compania", "width": "30%", "typeField": 'standard' }
  ];
  noAcademicExperienceList: any[];
  noAcademicExperienceTablePaginator = false;
  noAcademicExperienceTableRows = 10;
  selectedNoAcademicExperienceId; // fila seleccionada

  //Estudios
  schoolingColumns: any[] = [
    { "header": 'main.anio', "field": "anioTerminacion", "width": "10%", "typeField": 'standard' },
    { "header": 'curriculum.nombre_estudio', "field": "curso", "width": "30%", "typeField": 'standard' },
    { "header": 'main.disciplina', "field": "disciplina", "width": "30%", "typeField": 'standard' },
    { "header": 'main.institucion', "field": "institucion", "width": "30%", "typeField": 'standard' }
  ];
  schoolingList: any[];
  schoolingTablePaginator = false;
  schoolingTableRows = 10;
  selectedSchoolingId; // fila seleccionada

  //Publicaciones
  publicationsColumns: any[] = [
    { "header": 'curriculum.fecha_publ', "field": "fechaPublicacion", "width": "30%", "typeField": 'date' },
    { "header": 'curriculum.lugar_publ', "field": "lugarPublicacion", "width": "40%", "typeField": 'standard' },
    { "header": 'main.titulo', "field": "titulo", "width": "30%", "typeField": 'standard' }
  ];
  publicationsList: any[];
  publicationsTablePaginator = false;
  publicationsTableRows = 10;
  selectedPublicationId; // fila seleccionada

  //Certificaciones
  certificationsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "50%", "typeField": 'standard' },
    { "header": 'curriculum.no_certif', "field": "numeroCertificacion", "width": "50%", "typeField": 'standard' }
  ];
  certificationsList: any[];
  certificationsTablePaginator = false;
  certificationsTableRows = 10;
  selectedCertificationId; // fila seleccionada

  //activida profesional
  professionalActivitiesColumns: any[] = [
    { "header": 'main.iniciado_en', "field": "fechaInicio", "width": "20%", "typeField": 'date' },
    { "header": 'main.finalizado_en', "field": "fechaFinalizacion", "width": "20%", "typeField": 'date' },
    { "header": 'main.nombre', "field": "nombre", "width": "60%", "typeField": 'standard' }
  ];
  professionalActivitiesList: any[];
  professionalActivitiesTablePaginator = false;
  professionalActivitiesTableRows = 10;
  selectedProfessionalActivityId; // fila seleccionada

  //organizaciones
  organizationsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' }
  ];
  organizationsList: any[];
  organizationsTablePaginator = false;
  organizationsTableRows = 5;
  organizationsPage = 1;
  selectedOrganizationId; // fila seleccionada

  //Actividades de servicio
  serviceActivitiesColumns: any[] = [
    { "header": 'main.iniciado_en', "field": "fechaInicio", "width": "20%", "typeField": 'date' },
    { "header": 'main.finalizado_en', "field": "fechaFinalizacion", "width": "20%", "typeField": 'date' },
    { "header": 'main.nombre', "field": "nombre", "width": "30%", "typeField": 'standard' },
    { "header": 'main.entidad', "field": "entidad", "width": "30%", "typeField": 'standard' }
  ];
  serviceActivitiesList: any[];
  serviceActivitiesTablePaginator = false;
  serviceActivitiesTableRows = 10;
  selectedServiceActivityId;

  //honores y premios
  awardsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "90%", "typeField": 'standard' }
  ];
  awardList: any[];
  awardsTablePaginator = false;
  awardsTableRows = 10;
  selectedAwardId;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService, private curriculumVitaeService: CurriculumVitaeService,
              private modalService: NgbModal, @Inject(LOCALE_ID) locale: string, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 
              this.timeLocale = locale;
              this.spinner.show();
    }

  ngOnInit(): void {

    //listas
    this.getRoles();
    this.getRangos();
    this.getProgramas();
    
    this.registerCurriculumVitaeForm = this.formBuilder.group({
      id: [],
      primerNombre:["", [Validators.required, Validators.maxLength(200)]],
      segundoNombre:["", [Validators.maxLength(200)]],
      primerApellido:["", [Validators.required, Validators.maxLength(200)]],
      segundoApellido:["", [Validators.required, Validators.maxLength(200)]],
      rango:[null ],
      rol:[null],
      programa:[null],
      idUsuario:[null]
    });

    this.idUsuario = parseInt(sessionStorage.getItem('user'));//rescato el id que está almacenado en la sesión
    this.getCurriculumViate();
  }

  //obtener una hoja de vida.
  getCurriculumViate(){
    this.curriculumVitaeService.getCurriculumByIdUser(this.idUsuario).subscribe((res: any) => {
      this.curriculum = res;
      this.registerCurriculumVitaeForm.patchValue(this.curriculum);
      this.mode = 'UPDATE';
      this.selectedCurriculumId = res.id;
      res.updated_at = new Date(res.updated_at);
      this.fechaActaulizacion = (res.updated_at)? res.updated_at:res.created_at = new Date(res.created_at);

      this.getDetailsList();
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
      this.getUser();
    });
  }

  //obtiene la informacion de un usuario en caso de que aun no se haya hecho una hoja de vida
  getUser(){
    this.curriculumVitaeService.getUser(this.idUsuario).subscribe((res: any) => {
      this.user = res
      this.registerCurriculumVitaeForm.patchValue(this.user);
      this.mode = 'CREATE';
      this.fechaActaulizacion = 'Nunca';
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //lista de detalles
  getDetailsList(){
    this.getEstudios();
    this.getExperienciaAcademica();
    this.getExperienciaNoAcademica();
    this.getCertificaciones();
    this.getOrganizaciones();
    this.getPublicaciones();
    this.getActividadProfesional();
    this.getPremios();
    this.getActividadServicio();
  }

  //metodo para el control de envio de la información del formulario
  onSubmit(){
    this.submitted = true;
    if (this.registerCurriculumVitaeForm.invalid) {
      return;
    }
    this.submittedUp = true;
    
    this.curriculum.primerNombre = this.f.primerNombre.value;
    this.curriculum.segundoNombre = this.f.segundoNombre.value;
    this.curriculum.primerApellido = this.f.primerApellido.value;
    this.curriculum.segundoApellido = this.f.segundoApellido.value;
    this.curriculum.rango = this.f.rango.value;
    this.curriculum.rol = this.f.rol.value;
    this.curriculum.programa =  this.f.programa.value;
    this.curriculum.idUsuario =  this.idUsuario;
    this.onRegisterCurriculum();
  }

  //metodo para crear / actualizar el objeto hoja de vida
  onRegisterCurriculum(){
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.curriculumVitaeService.registerCurriculum(this.curriculum).subscribe( (res: any) => {
        this.getCurriculumViate();
         this.translate.get('success_create_update').subscribe((res: string) => {
            this.toastr.success(res);
          });
        this.mode = 'UPDATE';
      },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
        this.submittedUp = false;
      },
      () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.curriculumVitaeService.updateCurriculum(this.curriculum, this.curriculum.id).subscribe(
        (res: any) => {
          this.getCurriculumViate();
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

  //cancelar la operacion llevada en el formulario.
  onCancel(){
    this.submitted = false;
    this.getCurriculumViate();
  }

  //listas
  getRoles(){
    this.curriculumVitaeService.getDetailsByName('Roles').subscribe((res: any) => {
      this.RolesList = res;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //obtiene la lista de rangos
  getRangos(){
    this.curriculumVitaeService.getDetailsByName('Rangos').subscribe((res: any) => {
      this.RangosList = res;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //obtiene la lista de programas
  getProgramas(){
    this.curriculumVitaeService.getDetailsByName('Programas').subscribe((res: any) => {
      this.ProgramasList = res;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //listas de detalles de la hoja de vida
  //Estudios-------------------------------------------------------------------------------------------------------
  getEstudios(){
    this.curriculumVitaeService.getEstudios(this.curriculum.id).subscribe((res: any) => {
      this.schoolingList = res;
      this.schoolingTablePaginator = (res.length > this.schoolingTableRows) ? true : false;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de escolaridad
  onNewSchooling() {
    this.mdStickUp.show();
    this.modalComponetActive = 'schooling'; // estudios
    this.selectedSchoolingId = null;
  }

  //edicion de detalle
  onSaveSchooling() {
    this.mdStickUp.hide();
    this.getEstudios();
  }

  //edicion de detalle
  onEditSchooling(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'schooling'; // estudios
    this.selectedSchoolingId = id;
  }

  //borrar un registro de estudio
  onDeleteSchooling(id) {
    this.spinner.show();
    this.curriculumVitaeService.deleteSchooling(id).subscribe((res: any) => {
      this.getEstudios();
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

  //Experiencia Academica-------------------------------------------------------------------------------------------------------
  getExperienciaAcademica(){
    this.curriculumVitaeService.getExperienciaAcademica(this.curriculum.id).subscribe((res: any) => {
      this.academicExperienceList = res;
      this.academicExperienceTablePaginator = (res.length > this.academicExperienceTableRows) ? true : false;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de experiencia academica
  onNewAcademicExp() {
    this.mdStickUp.show();
    this.modalComponetActive = 'academicExp'; // experiencia academica
    this.selectedAcademicExperienceId = null;
  }

  onSaveAcademicExp() {
    this.mdStickUp.hide();
    this.getExperienciaAcademica();
  }

  //edicion de detalle
  onEditAcademicExp(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'academicExp'; // experiencia academica
    this.selectedAcademicExperienceId = id;
  }

  //borrar un registro de experiencia academica
  onDeleteAcademicExp(id) {
    this.spinner.show();
    this.curriculumVitaeService.deleteAcademicExp(id).subscribe((res: any) => {
      this.getExperienciaAcademica();
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

  //Experiencia No Academica-------------------------------------------------------------------------------------------------------
  getExperienciaNoAcademica(){
    this.curriculumVitaeService.getExperienciaNoAcademica(this.curriculum.id).subscribe((res: any) => {
      this.noAcademicExperienceList = res;
      this.noAcademicExperienceTablePaginator = (res.length > this.noAcademicExperienceTableRows) ? true : false;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de experiencia no academica
  onNewNoAcademicExp() {
    this.mdStickUp.show();
    this.modalComponetActive = 'noAcademicExp'; // experiencia no academica
    this.selectedNoAcademicExperienceId = null;
  }

  onSaveNoAcademicExp() {
    this.mdStickUp.hide();
    this.getExperienciaNoAcademica();
  }

  //edicion de detalle
  onEditNoAcademicExp(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'noAcademicExp'; // experiencia no academica
    this.selectedNoAcademicExperienceId = id;
  }

  //borrar un registro de experiencia no academica
  onDeleteNoAcademicExp(id) {
    this.spinner.show();
    this.curriculumVitaeService.deleteNoAcademicExp(id).subscribe((res: any) => {
      this.getExperienciaNoAcademica();
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

  //Certificaciones-------------------------------------------------------------------------------------------------------
  getCertificaciones(){
    this.curriculumVitaeService.getCertificaciones(this.curriculum.id).subscribe((res: any) => {
      this.certificationsList = res;
      this.certificationsTablePaginator = (res.length > this.certificationsTableRows) ? true : false;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de certificacion
  onNewCertification() {
    this.mdStickUp.show();
    this.modalComponetActive = 'certification';
    this.selectedCertificationId = null;
  }

  onSaveCertification() {
    this.mdStickUp.hide();
    this.getCertificaciones();
  }

  //edicion de detalle
  onEditCertification(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'certification';
    this.selectedCertificationId = id;
  }

  //borrar un registro de certificacion
  onDeleteCertification(id) {
    this.spinner.show();
    this.curriculumVitaeService.deleteCertification(id).subscribe((res: any) => {
      this.getCertificaciones();
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

  //Organizaciones-------------------------------------------------------------------------------------------------------
  getOrganizaciones(){
    this.curriculumVitaeService.getOrganizaciones(this.curriculum.id).subscribe((res: any) => {
      this.organizationsList = res;
      this.organizationsTablePaginator = (res.length > this.organizationsTableRows) ? true : false;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de organizacion
  onNewOrganization() {
    this.mdStickUp.show();
    this.modalComponetActive = 'organization';
    this.selectedOrganizationId = null;
  }

  onSaveOrganization() {
    this.mdStickUp.hide();
    this.getOrganizaciones();
  }

  //edicion de detalle
  onEditOrganization(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'organization';
    this.selectedOrganizationId = id;
  }

  //borrar un registro de organizacion
  onDeleteOrganization(id) {
    this.spinner.show();
    this.curriculumVitaeService.deleteOrganization(id).subscribe((res: any) => {
      this.getOrganizaciones();
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

  //Publicaciones-------------------------------------------------------------------------------------------------------
  getPublicaciones(){
    this.curriculumVitaeService.getPublicaciones(this.curriculum.id).subscribe((res: any) => {
      this.publicationsList = res;
      this.publicationsTablePaginator = (res.length > this.publicationsTableRows) ? true : false;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de publicacion
  onNewPublication() {
    this.mdStickUp.show();
    this.modalComponetActive = 'publication';
    this.selectedPublicationId = null;
  }

  onSavePublication() {
    this.mdStickUp.hide();
    this.getPublicaciones();
  }

  //edicion de detalle
  onEditPublication(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'publication';
    this.selectedPublicationId = id;
  }

  //borrar un registro de organizacion
  onDeletePublication(id) {
    this.spinner.show();
    this.curriculumVitaeService.deletePublication(id).subscribe((res: any) => {
      this.getPublicaciones();
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

  //Actividad Profesional-------------------------------------------------------------------------------------------------------
  getActividadProfesional(){
    this.curriculumVitaeService.getActividadProfesional(this.curriculum.id).subscribe((res: any) => {
      this.professionalActivitiesList = res;
      this.professionalActivitiesTablePaginator = (res.length > this.professionalActivitiesTableRows) ? true : false;
    },
    err => {
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de actividad profesional
  onNewProfessionalActivity() {
    this.mdStickUp.show();
    this.modalComponetActive = 'professionalAct';
    this.selectedProfessionalActivityId = null;
  }

  onSaveProfessionalActivity() {
    this.mdStickUp.hide();
    this.getActividadProfesional();
  }

  //edicion de detalle
  onEditProfessionalActivity(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'professionalAct';
    this.selectedProfessionalActivityId = id;
  }

  //borrar un registro de organizacion
  onDeleteProfessionalActivity(id) {
    this.spinner.show();
    this.curriculumVitaeService.deleteProfessionalActivity(id).subscribe((res: any) => {
      this.getActividadProfesional();
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

  //Premios-------------------------------------------------------------------------------------------------------
  getPremios(){
    this.curriculumVitaeService.getPremios(this.curriculum.id).subscribe((res: any) => {
      this.awardList = res;
      this.awardsTablePaginator = (res.length > this.awardsTableRows) ? true : false;
      //spinner
    },
    err => {
      //spinner
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de premio
  onNewAward() {
    this.mdStickUp.show();
    this.modalComponetActive = 'award';
    this.selectedAwardId = null;
  }

  onSaveAward() {
    this.mdStickUp.hide();
    this.getPremios();
  }

  //edicion de detalle
  onEditAward(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'award';
    this.selectedAwardId = id;
  }

  //borrar un registro de organizacion
  onDeleteAward(id) {
    this.spinner.show();
    this.curriculumVitaeService.deleteAward(id).subscribe((res: any) => {
      this.getPremios();
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

  //Actividades de Servicio-------------------------------------------------------------------------------------------------------
  getActividadServicio(){
    this.curriculumVitaeService.getActividadServicio(this.curriculum.id).subscribe((res: any) => {
      this.serviceActivitiesList = res;
      this.serviceActivitiesTablePaginator = (res.length > this.serviceActivitiesTableRows) ? true : false;
      //spinner
    },
    err => {
      //spinner
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //nuevo registro de actividad de servicio
  onNewServiceActivity() {
    // Nuevo detalle
    this.mdStickUp.show();
    this.modalComponetActive = 'serviceActv';
    this.selectedServiceActivityId = null;
  }

  onSaveServiceActivity() {
    this.mdStickUp.hide();
    this.getActividadServicio();
  }

  //edicion de detalle
  onEditServiceActivity(id) {
    this.mdStickUp.show();
    this.modalComponetActive = 'serviceActv';
    this.selectedServiceActivityId = id;
  }

  //borrar un registro de actividad de servicio
  onDeleteServiceActivity(id) {
    this.spinner.show();
    this.curriculumVitaeService.deleteServiceActivity(id).subscribe((res: any) => {
      this.getActividadServicio();
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

  //modal de confirmación de eliminacion
  confirmModal(confirmation: string, id, componentActive) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
      
      switch (componentActive) {
        case 'schooling':
          this.onDeleteSchooling(id);
          break;
        case 'academicExp':
          this.onDeleteAcademicExp(id);
          break;
        case 'noAcademicExp':
          this.onDeleteNoAcademicExp(id);
          break;
        case 'organization':
          this.onDeleteOrganization(id);
          break;
        case 'professionalAct':
          this.onDeleteProfessionalActivity(id);
          break;
        case 'certification':
          this.onDeleteCertification(id);
          break;
        case 'publication':
          this.onDeletePublication(id);
          break;
        case 'award':
          this.onDeleteAward(id);
          break;
        case 'serviceActv':
          this.onDeleteServiceActivity(id);
          break;
        default:
          break;
      }
    }, (reason) => {
      // console.log("pasado");
    });
  }
}
