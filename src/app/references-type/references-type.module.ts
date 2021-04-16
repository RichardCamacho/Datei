import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferencesTypeComponent } from './references-type/references-type.component';
import { ReferencesTypeListComponent } from './references-type-list/references-type-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ReferencesTypeRoutes } from './references-type-routing';
import { ReferencesTypeDetailComponent } from './references-type-detail/references-type-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    ReferencesTypeComponent, 
    ReferencesTypeListComponent, 
    ReferencesTypeDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ReferencesTypeRoutes),
    NGXFormWizardModule,
    CustomFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    ReactiveFormsModule,
    TableModule,
    ModalModule,
    TranslateModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    ConfirmationService
  ]
})
export class ReferencesTypeModule { }
