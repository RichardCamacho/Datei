import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectFoldersComponent } from './subject-folders/subject-folders.component';
import { SubjectFoldersListComponent } from './subject-folders-list/subject-folders-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationService } from 'primeng/api';
import { SubjectFolderRoutes } from './subject-folders-routing';
import { RegisterSectionsComponent } from '../sections/register-sections/register-sections.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    SubjectFoldersComponent, 
    SubjectFoldersListComponent,
    RegisterSectionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SubjectFolderRoutes),
    NGXFormWizardModule,
    CustomFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    NgSelectModule,
    ModalModule,
    TranslateModule,
    PaginatorModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService]
})
export class SubjectFoldersModule { }
