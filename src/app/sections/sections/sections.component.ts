import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SectionsService } from './sections.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  selectedSectionId;
  modalComponetActive = '';
  section: any = null;

  assessmentColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "75%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "25%", "typeField": 'date' }
  ];
  assessmentList: any[];
  assessmentTablePaginator = false;
  assessmentTableRows = 10;
  selectedAssesstmentRow; // fila seleccionada

  statementsColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "80%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "20%", "typeField": 'date' }
  ];
  statementsList: any[];
  statementsTablePaginator = false;
  statementsTableRows = 10;
  selectedStatementRow; // fila seleccionada

  studentSamplesColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "80%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "20%", "typeField": 'date' }
  ];
  studentSamplesList: any[];
  studentSamplesTablePaginator = false;
  studentSamplesTableRows = 10;
  selectedStudentSampleRow; // fila seleccionada

  feedbackColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "80%", "typeField": 'standard' },
    { "header": 'main.fecha_creacion', "field": "created_at", "width": "20%", "typeField": 'date' }
  ];
  feedbackList: any[];
  feedbackTablePaginator = false;
  feedbackTableRows = 10;
  selectedFeedbackRow; // fila seleccionada

  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;


  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
              private toastr: ToastrService, private sectionService: SectionsService,
              private modalService: NgbModal, private translate: TranslateService,
              private spinner: NgxSpinnerService) {

              this.spinner.show();
      this.activatedRoute.params.subscribe(params => {
        this.selectedSectionId = params.idS;
      });
  }

  ngOnInit(): void {
    this.getSectionById(this.selectedSectionId);

  }

  getSectionById(id){
    this.sectionService.getSectionById(id).subscribe((res: any) => {
      this.section = res;
      //metodo de listado de documentos
      this.getFileAssesstmenList();
      this.getFileStatementSamplesList();
      this.getFileStudentSamplesList();
      this.getFileFeedbackList();
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  //obtiene la url del servicio
  getUrlFileUpload() {
    return this.sectionService.getUrlFileUpload();
  }

  //Assesstmen--------------------------------------------------------------
  getFileAssesstmenList(){
    this.sectionService.getFileList(this.selectedSectionId, 'assesstmen').subscribe((res: any) => {
      this.assessmentList = res;
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }
  
  onNewAssesstmen() {
    this.mdStickUp.show();
    this.modalComponetActive = 'assesstmen';
  }

  onSaveAssesstmen() {
    this.mdStickUp.hide();
    this.translate.get('success_upload').subscribe((res: string) => {
      this.toastr.success(res);
    });
    this.getFileAssesstmenList();
  }

  onDownloadAssessment(id, filename) {
    this.spinner.show();
    this.sectionService.getFileById(id).subscribe((res: any) => {
      
      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = filename;
      link.click();
      
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`(onDownloadAssessment) Error, ${err.error.message}`)
    });
  }

  onDeleteAssesstmen(id) {
    this.spinner.show();
    this.sectionService.deleteFile(id).subscribe((res: any) => {
      this.spinner.hide();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
      this.getFileAssesstmenList();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  //Muestras de enunciado--------------------------------------------------------------
  getFileStatementSamplesList(){
    this.sectionService.getFileList(this.selectedSectionId, 'statementSamples').subscribe((res: any) => {
      this.statementsList = res;
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }
  
  onNewStatementSamples() {
    this.mdStickUp.show();
    this.modalComponetActive = 'statementSamples';
  }

  onSaveStatementSamples() {
    this.mdStickUp.hide();
    this.translate.get('success_upload').subscribe((res: string) => {
      this.toastr.success(res);
    });
    this.getFileStatementSamplesList();
  }

  onDownloadStatementSamples(id, filename) {
    this.spinner.show();
    this.sectionService.getFileById(id).subscribe((res: any) => {
      
      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = filename;
      link.click();
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  onDeleteStatementSamples(id) {
    this.sectionService.deleteFile(id).subscribe((res: any) => {
      this.spinner.hide();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
      this.getFileStatementSamplesList();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  //Muestras de estudiantes--------------------------------------------------------------
  getFileStudentSamplesList(){
    this.sectionService.getFileList(this.selectedSectionId, 'studentSamples').subscribe((res: any) => {
      this.studentSamplesList = res;
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }
  
  onNewStudentSamples() {
    this.mdStickUp.show();
    this.modalComponetActive = 'studentSamples';
  }

  onSaveStudentSamples() {
    this.mdStickUp.hide();
    this.translate.get('success_upload').subscribe((res: string) => {
      this.toastr.success(res);
    });
    this.getFileStudentSamplesList();
  }

  onDownloadStudentSamples(id, filename) {
    this.spinner.show();
    this.sectionService.getFileById(id).subscribe((res: any) => {
      
      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = filename;
      link.click();
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  onDeleteStudentSamples(id) {
    this.sectionService.deleteFile(id).subscribe((res: any) => {
      this.spinner.hide();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
      this.getFileStudentSamplesList();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  //Feedback--------------------------------------------------------------
  getFileFeedbackList(){
    this.sectionService.getFileList(this.selectedSectionId, 'feedback').subscribe((res: any) => {
      this.feedbackList = res;
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }
  
  onNewFeedback() {
    this.mdStickUp.show();
    this.modalComponetActive = 'feedback';
  }

  onSaveFeedback() {
    this.mdStickUp.hide();
    this.translate.get('success_upload').subscribe((res: string) => {
      this.toastr.success(res);
    });
    this.getFileFeedbackList();
  }

  onDownloadFeedback(id, filename) {
    this.spinner.show();
    this.sectionService.getFileById(id).subscribe((res: any) => {
      
      var downloadURL = window.URL.createObjectURL(res);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = filename;
      link.click();
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  onDeleteFeedback(id) {
    this.sectionService.deleteFile(id).subscribe((res: any) => {
      this.spinner.hide();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
      this.getFileFeedbackList();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  confirmModal(confirmation: string, id, componentActive) {
    
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			switch (componentActive) {
        case 'assesstmen':
          this.onDeleteAssesstmen(id);
          break;
        case 'statementSamples':
          this.onDeleteStatementSamples(id);
          break;
        case 'studentSamples':
          this.onDeleteStudentSamples(id);
          break;
        case 'feedback':
          this.onDeleteFeedback(id);
          break;
        default:
          break;
      }
		}, (reason) => {
      
		});
  }
}
