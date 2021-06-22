import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from './sections/sections.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SectionsRoutes } from './sections-routing';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { ConfirmationService } from 'primeng/api';
import { SharedModule } from '../shared/shared.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    SectionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(SectionsRoutes),
    NGXFormWizardModule,
    NgbModule,
    TableModule,
    NgSelectModule,
    ModalModule,
    TranslateModule,
    DynamicDialogModule,
    NgxSpinnerModule,
    AccordionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [ConfirmationService]
})
export class SectionsModule { }
