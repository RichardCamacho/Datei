import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectInformationComponent } from './subject-information/subject-information.component';
import { SubjectInformationRoutes } from './subject-information-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationService } from 'primeng/api';
import { SubjectInformationListComponent } from './subject-information-list/subject-information-list.component';
import { BooksComponent } from '../books/books/books.component';
import { PrerequisitesComponent } from '../prerequisites/prerequisites/prerequisites.component';
import { SpecificObjectivesComponent } from '../specific-objectives/specific-objectives/specific-objectives.component';
import { StudentOutcomesComponent } from '../student-outcomes/student-outcomes/student-outcomes.component';
import { TopicsComponent } from '../topics/topics/topics.component';
import { CoversComponent } from '../covers/covers/covers.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from '../shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    SubjectInformationComponent,
    SubjectInformationListComponent,
    BooksComponent,
    PrerequisitesComponent,
    SpecificObjectivesComponent,
    StudentOutcomesComponent,
    TopicsComponent,
    CoversComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(SubjectInformationRoutes),
    NGXFormWizardModule,
    CustomFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    NgSelectModule,
    ModalModule,
    NgbAccordionModule,
    HttpClientModule,
    TranslateModule,
    DynamicDialogModule,
    NgxSpinnerModule,
    FileUploadModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService]
})
export class SubjectInformationModule { }
