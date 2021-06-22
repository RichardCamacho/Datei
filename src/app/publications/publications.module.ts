import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationsComponent } from './publications/publications.component';
import { CoauthorsComponent } from '../coauthors/coauthors/coauthors.component';
import { RouterModule } from '@angular/router';
import { NGXFormWizardModule } from '../form/ngx-wizard/ngx-wizard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    PublicationsComponent,
    CoauthorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    NgxSpinnerModule,
    CalendarModule,
    AccordionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PublicationsModule { }
