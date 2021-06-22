import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesComponent } from './courses/courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursesRoutes } from './courses-routing';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { FacultyComponent } from '../faculty/faculty/faculty.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PrerequisitesComponent } from '../prerequisites/prerequisites/prerequisites.component';
import { SpecificObjectivesComponent } from '../specific-objectives/specific-objectives/specific-objectives.component';
import { TopicsComponent } from '../topics/topics/topics.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    CoursesListComponent, 
    CoursesComponent,
    FacultyComponent,
    PrerequisitesComponent,
    SpecificObjectivesComponent,
    TopicsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(CoursesRoutes),
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
    NgxSpinnerModule,
    DynamicDialogModule,
    AccordionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService, DialogService]
})
export class CoursesModule { }
