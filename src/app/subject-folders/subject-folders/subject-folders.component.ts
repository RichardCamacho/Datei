import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { SubjectFolder } from './subject-folders.model';
import { SubjectFoldersService } from './subject-folders.service';
import { NgxSpinnerService } from "ngx-spinner";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { formatDate } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-subject-folders',
  templateUrl: './subject-folders.component.html',
  styleUrls: ['./subject-folders.component.css']
})
export class SubjectFoldersComponent implements OnInit {

  currentJustify = 'fill';

  registerSubjectFolderForm: FormGroup;
  submitted = false; //identifica el estado del formulario
  submittedUp = false; //auxiliar - identifica el estado del formulario
  selectedSubjectFolderId; // registra el id seleccionado que viene en la URL.
  mode = ''; // identifica el modo de transaccion del componente: CREATE , UPDATE
  subjectFolder = new SubjectFolder;
  InstructoresList: any[];//lista de instructores

  curriculum: any = null;
  curriculumstate: boolean = true;
  cursosList: any[];
  subject: any = null;
  idUsuario;
  programaTr;
  timeLocale:any;
  lenguaje: string = 'es';

  modalComponetActive = '';
  selectedSectionId;

  param100 = {value: '100'};
  param200 = {value: '200'};
  param500 = {value: '500'};
  param1000 = {value: '1000'};
  
  sectionsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "50%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "50%", "typeField": 'date' }
  ];
  sectionsList: any[];
  sectionsTablePaginator = false;
  sectionsTableRows = 5;
  selectedSectionRow; // fila seleccionada

  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;

  get f() {
    return this.registerSubjectFolderForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
            private toastr: ToastrService, private subjectFolderService: SubjectFoldersService,
            private modalService: NgbModal, private translate: TranslateService,
            private spinner: NgxSpinnerService, @Inject(LOCALE_ID) locale: string) { 

            this.spinner.show();
            
            this.activatedRoute.params.subscribe(params => {
              this.selectedSubjectFolderId = params.id; // argumento enviado en la ruta
              if (this.selectedSubjectFolderId === undefined || this.selectedSubjectFolderId == null) {
                this.mode = 'CREATE';
                this.getCursoInfo();
              } else {
                this.mode = 'UPDATE';
                this.getSubjectFolder(this.selectedSubjectFolderId);
              }
            });

            this.timeLocale = locale;
    }

  ngOnInit(): void {
    this.registerSubjectFolderForm = this.formBuilder.group({
      id: [],
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      codigo: ["", [Validators.required, Validators.maxLength(200)]],
      indicador: ["", [Validators.required, Validators.maxLength(10)]],
      curriculum: [null, [Validators.required]],
      curso: [null, [Validators.required]],
      idUsuario: [null]
    });

    this.idUsuario = parseInt(sessionStorage.getItem('user'));//rescato el id que está almacenado en la sesión
    this.getCurriculumVitae();
    this.getAllSubjectsByUser();

    this.f.curso.valueChanges.subscribe(res => {
      if(res!=null){
        if(this.f.curso.value.id !== undefined){
          this.getSubject(this.f.curso.value.id);
        }
      }else{
        this.subject = null;
      }
    });

    this.translate.onLangChange.subscribe(res => {
      this.lenguaje = res.lang;
      this.getProgram();
    });
    
  }

  getProgram(){
    //nombre del programa
    switch (this.f.indicador.value) {
      case '220':
        this.programaTr = 'main.sistemas';
        break;
      case '221':
        this.programaTr = 'main.alimentos';
        break;
      case '222':
        this.programaTr = 'main.quimica';
        break;
      case '223':
        this.programaTr = 'main.civil';
        break;
      case '224':
        this.programaTr = 'main.farmaceutica';
        break;
      default:
        break;
    }
  }

  getCursoInfo(){
    var idCurso = parseInt(sessionStorage.getItem('programa'));
    this.subjectFolderService.getCursoInfo(idCurso).subscribe((res: any) => {
      switch (res.nombre) {
        case 'Ingeniería de Sistemas':
          this.f.indicador.setValue('220');
          this.programaTr = 'main.sistemas';
          break;
        case 'Ingeniería de Alimentos':
          this.f.indicador.setValue('221');
          this.programaTr = 'main.alimentos';
          break;
        case 'Ingeniería Química':
          this.f.indicador.setValue('222');
          this.programaTr = 'main.quimica';
          break;
        case 'Ingeniería Civil':
          this.f.indicador.setValue('223');
          this.programaTr = 'main.civil';
          break;
        case 'Química Farmacéutica':
          this.f.indicador.setValue('224');
          this.programaTr = 'main.farmaceutica';
          break;
        default:
          break;
      }
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getSubjectFolder(id){
    this.subjectFolderService.getSubjectFolderById(id).subscribe((res: any) => {
      this.subjectFolder = res;
      this.registerSubjectFolderForm.patchValue(this.subjectFolder);
      this.getProgram();
      this.getSubject(res.curso);
      this.getSections();
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getCurriculumVitae(){
    this.spinner.show();
    this.subjectFolderService.getCurriculumByIdUser(this.idUsuario).subscribe((res: any) => {
      this.curriculum = res;
      if(res !== null){
        this.curriculumstate = false;
        this.f.curriculum.setValue(res.id);
      }else{
        this.curriculumstate = true;
      }
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getAllSubjectsByUser(){
    this.spinner.show();
    this.subjectFolderService.getSubjectsByIdUser(this.idUsuario).subscribe((res: any) => {
      this.cursosList = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  getSubject(id) {
    this.spinner.show();
    this.subjectFolderService.getSubjectDetById(id).subscribe((res: any) => {
      this.subject = res;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.registerSubjectFolderForm.value)
    if (this.registerSubjectFolderForm.invalid) {

      if(this.f.curso.value === null){
        this.toastr.error(`Error, No ha seleccionado un curso para esta carpeta`);
      }
      if(this.curriculum === null){
        this.toastr.error(`Error, No se ha registrado hoja de vida`);
      }
      return;
    }
    this.f.curso.setValue(this.subject.id);
    this.submittedUp = true;
    this.subjectFolder = this.registerSubjectFolderForm.value;
    this.subjectFolder.idUsuario =  this.idUsuario;
    this.onRegisterSubjectFolder();
  }

  onRegisterSubjectFolder(){
    this.spinner.show();
    if (this.mode === 'CREATE') {
      this.subjectFolderService.registerSubjectFolder(this.subjectFolder).subscribe( (res: any) => {
        this.spinner.hide();
        this.subjectFolder = res;
        this.translate.get('success_create_update').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.mode = 'UPDATE';
        this.onSaveSubjectFolder(this.subjectFolder.id);
      },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
        this.submittedUp = false;
      },
      () => { }
      );
    } else if (this.mode === 'UPDATE') {
      this.subjectFolderService.updateSubjectFolder(this.subjectFolder, this.subjectFolder.id).subscribe((res: any) => {
          this.subjectFolder = res;
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

  onCancel(){
    this.submitted = false;
    this.registerSubjectFolderForm.reset();
    this.subject = null;
    if (this.mode === 'UPDATE') {
      this.getSubjectFolder(this.selectedSubjectFolderId);
    }
  }

  //redireccionar al estado de edición
  onSaveSubjectFolder(id) {
    this.router.navigate([`./app/subject-folder/${id}`]);
  }

  //Secciones-------------------------------------------------------------------------------------------------------

  getSections(){
    this.spinner.show();
    this.subjectFolderService.getSectionByC(this.subjectFolder.id).subscribe((res: any) => {
      this.sectionsList = res;
      this.sectionsTablePaginator = (res.length > this.sectionsTableRows) ? true : false;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onNewSection() {
    this.mdStickUp.show();
    this.modalComponetActive = 'sections';
    this.selectedSectionId = null;
  }

  onSaveSection() {
    this.mdStickUp.hide();
    this.getSections();
  }

  onEditSection(id) {
    // edicion de detalle
    this.mdStickUp.show();
    this.modalComponetActive = 'sections';
    this.selectedSectionId = id;
  }

  //redirecciona para observar el contenido de una sección
  onViewSection(id){
    this.router.navigate([`./app/section/view/${id}`]);
  }

  //borrar un registro de objetivo
  onDeleteSection(id) {
    this.spinner.show();
    this.subjectFolderService.deleteSection(id).subscribe((res: any) => {
      this.getSections();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  confirmModal(confirmation: string, id, componentActive) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			switch (componentActive) {
        case 'sections':
          this.onDeleteSection(id);
          break;
        default:
          break;
      }
		}, (reason) => {
			// console.log("pasado");
		});
  }

  //descragar pdf del apendice A - informacion de curso
  onDownloadAppendixA(){
    
    const documentDefinition = this.buildingPDFApendixA();
    
    pdfMake.fonts = {
      timesNew: { 
        normal: 'times.ttf',
        bold: 'timesbd.ttf',
        italics: 'timesi.ttf',
        bolditalics: 'timesbi.ttf'
      }
    }
    pdfMake.createPdf(documentDefinition).open();
  }

  buildingPDFApendixA(){
    this.spinner.show();
    var facultad, programa, acreditacion, docentes, cod_nombre_curso,
    creditos, credito, horas, por_semestre, libro, materiales, inf_esp_curso,
    prereq_coreq, tipo_curso, tipo_curso_c, objetivo, temas, apendice_a,
    autor, titulo, editorial, anio;

    //facultad
    this.translate.get('main.facultad').subscribe((res: string) => {
      facultad = res;
    });
    //nombre del programa
    switch (this.subjectFolder.indicador) {
      case '220':
        this.translate.get('main.sistemas').subscribe((res: string) => {
          programa = res;
        });
        break;
      case '221':
        this.translate.get('main.alimentos').subscribe((res: string) => {
          programa = res;
        });
        break;
      case '222':
        this.translate.get('main.quimica').subscribe((res: string) => {
          programa = res;
        });
        break;
      case '223':
        this.translate.get('main.civil').subscribe((res: string) => {
          programa = res;
        });
        break;
      case '224':
        this.translate.get('main.farmaceutica').subscribe((res: string) => {
          programa = res;
        });
        break;
      default:
        break;
    }
    //acreditación
    this.translate.get('main.acreditacion').subscribe((res: string) => {
      acreditacion = res;
    });
    //codigo/nombre curso
    this.translate.get('carpeta_asig.numero_nombre_curso').subscribe((res: string) => {
      cod_nombre_curso = res;
    });
    //creditos y horas
    this.translate.get('carpeta_asig.creditos').subscribe((res: string) => {
      creditos = res;
    });
    this.translate.get('carpeta_asig.credito').subscribe((res: string) => {
      credito = res;
    });
    this.translate.get('carpeta_asig.horas').subscribe((res: string) => {
      horas = res;
    });
    this.translate.get('carpeta_asig.por_semestre').subscribe((res: string) => {
      por_semestre = res;
    });
    this.translate.get('carpeta_asig.apendice_a').subscribe((res: string) => {
      apendice_a = res;
    });
    //docentes
    this.translate.get('carpeta_asig.nombre_docentes').subscribe((res: string) => {
      docentes = res;
    });
    //libro
    this.translate.get('carpeta_asig.libro').subscribe((res: string) => {
      libro = res;
    });
    //materiales
    this.translate.get('carpeta_asig.materiales').subscribe((res: string) => {
      materiales = res;
    });
    //inf del curso
    this.translate.get('carpeta_asig.inf_esp_curso').subscribe((res: string) => {
      inf_esp_curso = res;
    });
    //prerequisitos
    this.translate.get('carpeta_asig.prereq_coreq').subscribe((res: string) => {
      prereq_coreq = res;
    });
    //tipo de curso
    this.translate.get('carpeta_asig.tipo_curso').subscribe((res: string) => {
      tipo_curso = res;
    });
    this.translate.get(this.subject.tipoCurso.nombre).subscribe((res: string) => {
      tipo_curso_c = res;
    });
    //objetivos
    this.translate.get('carpeta_asig.objetivo').subscribe((res: string) => {
      objetivo = res;
    });
    //temas
    this.translate.get('carpeta_asig.temas').subscribe((res: string) => {
      temas = res;
    });
    
    autor = (this.subject.autor)? this.subject.autor:'';
    titulo = (this.subject.titulo)? this.subject.titulo:'';
    editorial = (this.subject.editorial)? this.subject.editorial:'';
    anio = (this.subject.anio)? this.subject.anio:'';

    this.spinner.hide();
    return {
      content : [
        //encabezado
        {
          text: 'UNIVERSIDAD DE CARTAGENA',
          style: 'encabezado'
        },
        {
          text: facultad,
          style: 'encabezado'
        },
        {
          text: programa,
          style: 'encabezado'
        },
        {
          text: acreditacion,
          style: 'encabezado'
        },
        {
          text: apendice_a,
          style: 'encabezado'
        },
        //codigo y nombre del curso
        {
          text: '1. ' + cod_nombre_curso,//tener en cuenta el nombre en ingles
          fontSize: 9,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        {
          text: (this.lenguaje === 'es')? this.subject.codigo + ' ' + this.subject.nombreEspaniol : this.subject.codigo + ' ' + this.subject.nombreIngles,
          fontSize: 9,
        },
        //creditos y horas
        {
          text: '2. ' + creditos,
          style: 'subtitle'
        },
        {
          text: credito + ': ' + this.subject.numeroCreditos + '. ' + horas + ': ' + this.subject.horasSemestre + ' ' + por_semestre,
          fontSize: 9,
        },
        //docentes
        {
          columns: [
            {
              text: '3. ' + docentes,
              style: 'subtitle'
            }
            
          ]
        },
        {
          columns: [
            this.getFaultyList(this.subject.docentes)
          ]
        },
        //Libro del curso
        {
          text: '4. ' + libro,
          style: 'subtitle'
        },
        {
          text: autor + ', ' + titulo + ', ' + editorial + ', ' + anio,
          fontSize: 9,
        },
        //Otros materiales
        {
          columns: [
            {
              text: '5. ' + materiales,
              style: 'subtitle'
            }
            
          ]
        },
        {
          columns: [
            this.getOtherMaterialsList(this.subject.libros)
          ]
        },
        //Información del curso
        {
          text: '6. ' + inf_esp_curso,
          style: 'subtitle'
        },
        {
          text: this.subject.informacion,
          fontSize: 9,
        },
        //Pre-requisitos y co-requisitos
        {
          columns: [
            {
              text: '7. ' + prereq_coreq,
              style: 'subtitle'
            }
            
          ]
        },
        {
          columns: [
            this.getPrerequisitesList(this.subject.prerequisitos)
          ]
        },
        //Tipo de Curso
        {
          text: '8. ' + tipo_curso,
          style: 'subtitle'
        },
        {
          text: tipo_curso_c,
          fontSize: 9,
        },
        //Objetivos
        {
          columns: [
            {
              text: '9. ' + objetivo,
              style: 'subtitle'
            }
            
          ]
        },
        {
          columns: [
            this.getObjectivesList(this.subject.objetivos)
          ]
        },
        //Student Outcomes
        {
          columns: [
            {
              text: '10. Student Outcomes',
              style: 'subtitle'
            }
            
          ]
        },
        {
          columns: [
            this.getSOList(this.subject.student_outcomes)
          ]
        },
        //Lista de Temas
        {
          columns: [
            {
              text: '11. ' + temas,
              style: 'subtitle'
            }
            
          ]
        },
        {
          columns: [
            this.getTopicsList(this.subject.temas_curso)
          ]
        }
      ],
      defaultStyle: {
        font: 'timesNew'
      },
      styles: {
        encabezado: {
          fontSize: 9,
          alignment: 'center',
          bold: true,
          margin: [0, 0, 0, 5]
        },
        subtitle: {
          fontSize: 9,
          bold: true,
          margin: [0, 10, 0, 2]
        }
      }
    }
  }

  getFaultyList(facultyList){
    const content = [];
    facultyList.forEach(faculty => {
      content.push(
        {
          text: faculty.nombre,
          fontSize: 9,
          margin: [0, 0, 0, 2]
        }
      )
    });

    return{
      ul:[
        ...content
      ]
    }
  }

  getOtherMaterialsList(otherMaterialsList){
    const content = [];

    if(otherMaterialsList.length !== 0){
      otherMaterialsList.forEach(book => {
        content.push(
          {
            text: book.autor + ', ' + book.titulo + ', ' + book.editorial + ', ' + book.anio,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getPrerequisitesList(prerequisitesList){
    const content = [];

    if(prerequisitesList.length !== 0){
      prerequisitesList.forEach(prerequisite => {
        content.push(
          {
            text: prerequisite.nombre,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getObjectivesList(objectivesList){
    const content = [];
    if(objectivesList.length !== 0){
      objectivesList.forEach(objective => {
        content.push(
          {
            text: objective.nombre,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getSOList(soList){
    const content = [];
    if(soList.length !== 0){
      soList.forEach(so => {
        content.push(
          {
            text: so.nombre + ': ' + so.descripcion,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getTopicsList(topicsList){
    const content = [];
    if(topicsList.length !== 0){
      topicsList.forEach(topic => {
        content.push(
          {
            text: topic.nombre,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  //descragar pdf del apendice B - hoja de vida
  onDownloadAppendixB(){
    
    const documentDefinition = this.buildingPDFApendixB();
    
    pdfMake.fonts = {
      timesNew: { 
        normal: 'times.ttf',
        bold: 'timesbd.ttf',
        italics: 'timesi.ttf',
        bolditalics: 'timesbi.ttf'
      }
    }
    pdfMake.createPdf(documentDefinition).open();
  }

  buildingPDFApendixB(){
    this.spinner.show();

    var facultad, sistemas, acreditacion, docentes, nombre_docente,
    estudios, apendice_b, exp_academica, exp_no_academica, certificado, 
    org_tooltip, honores, act_servicio, publicaciones, act_prof, segundoNombre;

    //facultad
    this.translate.get('main.facultad').subscribe((res: string) => {
      facultad = res;
    });
    //nombre del programa
    this.translate.get('main.sistemas').subscribe((res: string) => {
      sistemas = res;
    });
    //acreditación
    this.translate.get('main.acreditacion').subscribe((res: string) => {
      acreditacion = res;
    });
    //apendice B
    this.translate.get('carpeta_asig.apendice_b').subscribe((res: string) => {
      apendice_b = res;
    });


    //nombre docente
    this.translate.get('carpeta_asig.nombre_docente').subscribe((res: string) => {
      nombre_docente = res;
    });
    //estudios
    this.translate.get('carpeta_asig.estudios').subscribe((res: string) => {
      estudios = res;
    });
    //exp academica
    this.translate.get('carpeta_asig.exp_academica').subscribe((res: string) => {
      exp_academica = res;
    });
    //exp no academica
    this.translate.get('carpeta_asig.exp_no_academica').subscribe((res: string) => {
      exp_no_academica = res;
    });
    //certificados
    this.translate.get('curriculum.certificado').subscribe((res: string) => {
      certificado = res;
    });
    //organizaciones
    this.translate.get('curriculum.org_tooltip').subscribe((res: string) => {
      org_tooltip = res;
    });
    //honores
    this.translate.get('curriculum.honores').subscribe((res: string) => {
      honores = res;
    });
    //actividad de servicio
    this.translate.get('carpeta_asig.act_servicio').subscribe((res: string) => {
      act_servicio = res;
    });
    //publicaciones
    this.translate.get('carpeta_asig.publicaciones').subscribe((res: string) => {
      publicaciones = res;
    });
    //actividad profesional
    this.translate.get('carpeta_asig.act_prof').subscribe((res: string) => {
      act_prof = res;
    });
    
    segundoNombre = (this.curriculum.segundoNombre)? this.curriculum.segundoNombre:'';

    this.spinner.hide();
    return {
      content : [
        //encabezado
        {
          text: 'UNIVERSIDAD DE CARTAGENA',
          style: 'encabezado'
        },
        {
          text: facultad,
          style: 'encabezado'
        },
        {
          text: sistemas,//debo modificar
          style: 'encabezado'
        },
        {
          text: acreditacion,
          style: 'encabezado'
        },
        {
          text: apendice_b,
          style: 'encabezado'
        },
        //nombre de docente
        {
          text: '1. ' + nombre_docente,//tener en cuenta el nombre en ingles
          fontSize: 9,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        {
          text: this.curriculum.primerNombre + ' ' + segundoNombre + ' ' + this.curriculum.primerApellido + ' ' + this.curriculum.segundoApellido,
          fontSize: 9,
        },
        //estudios
        {
          text: '2. ' + estudios,
          style: 'subtitle'
        },
        {
          columns: [
            this.getSchoolingList(this.curriculum.estudios)
          ]
        },
        //exp academica
        {
          text: '3. ' + exp_academica,
          style: 'subtitle'
        },
        {
          columns: [
            this.getAcademicExpList(this.curriculum.exp_academica)
          ]
        },
        //exp no academica
        {
          text: '4. ' + exp_no_academica,
          style: 'subtitle'
        },
        {
          columns: [
            this.getNoAcademicExpList(this.curriculum.exp_no_academica)
          ]
        },
        //certificados
        {
          text: '5. ' + certificado,
          style: 'subtitle'
        },
        {
          columns: [
            this.getCertificationsList(this.curriculum.certificaciones)
          ]
        },
        //organizaciones
        {
          text: '6. ' + org_tooltip,
          style: 'subtitle'
        },
        {
          columns: [
            this.getOrganizationsList(this.curriculum.organizaciones)
          ]
        },
        //honores
        {
          text: '7. ' + honores,
          style: 'subtitle'
        },
        {
          columns: [
            this.getAwardsList(this.curriculum.premios)
          ]
        },
        //actividades de servicio
        {
          text: '8. ' + act_servicio,
          style: 'subtitle'
        },
        {
          columns: [
            this.getServiceActList(this.curriculum.activ_servicio)
          ]
        },
        //publicaciones
        {
          text: '9. ' + publicaciones,
          style: 'subtitle'
        },
        {
          columns: [
            this.getPublicationsList(this.curriculum.publicaciones)
          ]
        },
        //organizaciones
        {
          text: '10. ' + act_prof,
          style: 'subtitle'
        },
        {
          columns: [
            this.getProfessionalActList(this.curriculum.activ_profesional)
          ]
        },
      ],
      defaultStyle: {
        font: 'timesNew'
      },
      styles: {
        encabezado: {
          fontSize: 9,
          alignment: 'center',
          bold: true,
          margin: [0, 0, 0, 5]
        },
        subtitle: {
          fontSize: 9,
          bold: true,
          margin: [0, 10, 0, 2]
        }
      }
    }
  }

  getSchoolingList(schoolingList){
    const content = [];
    if(schoolingList.length !== 0){
        schoolingList.forEach(schooling => {
        content.push(
          {
            text: schooling.curso + ', ' + schooling.disciplina + ', ' + schooling.institucion + ', ' + schooling.anioTerminacion,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });

      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
  }
    
  }

  getAcademicExpList(exp_academicaList){
    const content = [];
    if(exp_academicaList.length !== 0){
        exp_academicaList.forEach(exp_academica => {
        var fecha = formatDate(exp_academica.fechaFinalizacion, 'dd/MM/yyyy', this.timeLocale);
        content.push(
          {
            text: fecha + ', ' + exp_academica.titulo + ', ' + exp_academica.institucion,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });

      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
    
  }

  getNoAcademicExpList(exp_no_academicaList){
    const content = [];
    if(exp_no_academicaList.length !== 0){
        exp_no_academicaList.forEach(exp_no_academica => {
        var fecha = formatDate(exp_no_academica.fechaFinalizacion, 'dd/MM/yyyy', this.timeLocale);
        content.push(
          {
            text: fecha + ', ' + exp_no_academica.compania + ', ' + exp_no_academica.titulo + ', ' + exp_no_academica.descripcion,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });

      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
    
  }

  getCertificationsList(certificationsList){
    const content = [];

    if(certificationsList.length !== 0){
      certificationsList.forEach(certification => {
        content.push(
          {
            text: certification.nombre + ', Registro No. ' + certification.numeroCertificacion,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getOrganizationsList(organizationsList){
    const content = [];

    if(organizationsList.length !== 0){
      organizationsList.forEach(organization => {
        content.push(
          {
            text: organization.nombre,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getAwardsList(awardsList){
    const content = [];

    if(awardsList.length !== 0){
      awardsList.forEach(award => {
        content.push(
          {
            text: award.nombre,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getServiceActList(serviceActList){
    const content = [];

    if(serviceActList.length !== 0){
      serviceActList.forEach(serviceAct => {
        var fechaInicio = formatDate(serviceAct.fechaInicio, 'dd/MM/yyyy', this.timeLocale);
        var fechaFinalizacion = formatDate(serviceAct.fechaFinalizacion, 'dd/MM/yyyy', this.timeLocale);
        content.push(
          {
            text: fechaInicio + ' - ' + fechaFinalizacion + ', ' + serviceAct.nombre + ', ' + serviceAct.entidad,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getPublicationsList(publicationsList){
    const content = [];

    if(publicationsList.length !== 0){
      publicationsList.forEach(publication => {
        var fechaPublicacion = formatDate(publication.fechaPublicacion, 'dd/MM/yyyy', this.timeLocale);
        content.push(
          {
            text: fechaPublicacion + ', ' + publication.titulo + ', ' + publication.lugarPublicacion,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

  getProfessionalActList(profActList){
    const content = [];

    if(profActList.length !== 0){
      profActList.forEach(publication => {
        var fechaInicio = formatDate(publication.fechaInicio, 'dd/MM/yyyy', this.timeLocale);
        var fechaFinalizacion = formatDate(publication.fechaFinalizacion, 'dd/MM/yyyy', this.timeLocale);
        content.push(
          {
            text: fechaInicio + ' - ' + fechaFinalizacion + ', ' + publication.nombre,
            fontSize: 9,
            margin: [0, 0, 0, 2]
          }
        )
      });
  
      return{
        ul:[
          ...content
        ]
      }
    }else{
      var ninguno
      this.translate.get('main.ninguno').subscribe((res: string) => {
        ninguno = res;
      });

      return{
          text: ninguno,
          fontSize: 9,
      }
    }
  }

}
