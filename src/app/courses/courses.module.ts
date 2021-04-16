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

@NgModule({
  declarations: [
    CoursesListComponent, 
    CoursesComponent,
    FacultyComponent
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
    TranslateModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService]
})
export class CoursesModule { }
